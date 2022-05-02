import {Service} from "typedi";
import {Result} from "../../models/Result";
import {ProductCategory} from "../../entities/ProductCategory";
import {getCustomRepository} from "typeorm";
import {ProductCategoryRepository} from "../repositories/ProductCategoryRepository";
import * as firebase from 'firebase-admin';
import {FirebaseService} from "../services/FirebaseService";
import admin from "firebase-admin";
import DocumentData = admin.firestore.DocumentData;
import {ServiceCategory} from "../../entities/ServiceCategory";
import {ServiceCategoryRepository} from "../repositories/ServiceCategoryRepository";
import {ProductSubCategory} from "../../entities/ProductSubCategory";
import {ProductSubCategoryRepository} from "../repositories/ProductSubCategoryRepository";
import {ServiceSubCategory} from "../../entities/ServiceSubCategory";
import {ServiceSubCategoryRepository} from "../repositories/ServiceSubCategoryRepository";
import {ServiceEntity} from "../../entities/ServiceEntity";
import {ServiceRepository} from "../repositories/ServiceRepository";
import {ServicePackage} from "../../entities/ServicePackage";
import {ServicePackageRepository} from "../repositories/ServicePackageRepository";
import {Product} from "../../entities/Product";
import {ProductRepository} from "../repositories/ProductRepository";
import QueryDocumentSnapshot = admin.firestore.QueryDocumentSnapshot;
import {DeliveryArea} from "../../entities/DeliveryArea";
import {DeliveryAreaRepository} from "../repositories/DeliveryAreaRepository";
import {Vendor} from "../../entities/Vendor";
import {VendorRepository} from "../repositories/VendorRepository";
import {VendorProduct} from "../../entities/VendorProduct";
import {VendorProductRepository} from "../repositories/VendorProductRepository";
import {User} from "../../entities/User";
import {UserRepository} from "../repositories/UserRepository";

@Service()
export class FirebaseServiceImpl implements FirebaseService {

    protected productCategoryRepository = getCustomRepository(ProductCategoryRepository);
    protected productSubCategoryRepository = getCustomRepository(ProductSubCategoryRepository);
    protected productRepository = getCustomRepository(ProductRepository);
    protected vendorProductRepository = getCustomRepository(VendorProductRepository);
    protected serviceCategoryRepository = getCustomRepository(ServiceCategoryRepository);
    protected serviceSubCategoryRepository = getCustomRepository(ServiceSubCategoryRepository);
    protected serviceRepository = getCustomRepository(ServiceRepository);
    protected servicePackageRepository = getCustomRepository(ServicePackageRepository);
    protected deliveryAreaRepository = getCustomRepository(DeliveryAreaRepository);
    protected vendorRepository = getCustomRepository(VendorRepository);
    protected userRepository = getCustomRepository(UserRepository);


    async getDocumentListFromFirebase  (collectionName :string  ) {
        let db = firebase.firestore();
        let documentList : DocumentData []= [];
        await db.collection(collectionName)
            //.limit(5)
            //.orderBy("product_id")
            //.startAt( '4mNy1JaNda5tW02k24er')
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    documentList.push(doc.data());
                });
            }).catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        return documentList;
    }

    async addAllProductCategories(): Promise<Result> {

        let firebaseCategories : DocumentData []= await this.getDocumentListFromFirebase('productCategory');

        const nodeCategories : ProductCategory[]  = []
        for(const item of firebaseCategories){
            const category = new ProductCategory();
            category.name = item.category_name;
            category.description = "This is a default description";
            category.logo = item.category_pic;
            category.isActive = true;
            category.firebaseId = item.category_id;
            category.weight = item.weight;

            nodeCategories.push(category);
        }

        const response = await this.productCategoryRepository.save(nodeCategories);
        return Result.succesful(response);
    }

    async addAllProducts(): Promise<Result> {
        this.addProductsInBackground();
        return Result.succesful("success");
    }

    async addProductsInBackground() {

        let firebaseProducts : DocumentData []= await this.getDocumentListFromFirebase('products');


        for(const item of firebaseProducts){
            const product = new Product();

            product.name = item.product_name;
            product.image = item.product_pic;
            product.description = item.product_details;
            product.price = item.product_price;
            product.company = item.product_company;
            product.code = item.product_code;
            product.productWeight = item.product_weight;
            product.weightUnit = item.product_weight_unit;
            product.genericName = item.generic_name;
            product.dosageForm = item.dosage_form;
            product.strength = item.product_strength;
            product.type = item.product_type;
            product.productPriceTp = item.product_price_tp;
            product.limit = item.product_limit;
            product.isWholeSaleProduct = item.wholesale_product;
            product.wholesalePricePerUnit = item.wholesale_price_per_unit;
            product.weight = item.weight;
            product.isActive = true;
            product.firebaseId = item.product_id;

            product.categories = [];
            product.subCategories = [];

            let db = firebase.firestore();
            let categorySubcategoryMapList : DocumentData []= [];
            await db.collection("categorySubcategoryWithProducts")
                .where("product_id", "==",  item.product_id)
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        categorySubcategoryMapList.push(doc.data())
                    });
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });


            for(const mapItem of categorySubcategoryMapList){
                const productCategory  = await this.productCategoryRepository.findOne({firebaseId : mapItem.category_id})
                if(productCategory)product.categories.push({"id" : productCategory.id})
                const productSubCategory  = await this.productSubCategoryRepository.findOne({firebaseId : mapItem.sub_category_id})
                if(productSubCategory)product.subCategories.push({"id" : productSubCategory.id})
            }

            console.log("new product to push  " , product.name)

            await this.productRepository.save(product).then(() => {
                console.log("pushed    " ,  product.name)
            })
                .catch(err => {
                    console.log("error occured " , err)
                });
        }
    }

    async addAllVendorProducts(): Promise<Result> {
        this.addVendorProductsInBackground()
        return Result.succesful("success");
    }

    async addVendorProductsInBackground () {
        let vendorProducts : DocumentData []= await this.getDocumentListFromFirebase('vendorProducts');


        const nodeVendorProducts : VendorProduct[]  = []
        for(const item of vendorProducts){



            const vendor = await this.vendorRepository.findOne({where : {firebaseId : item.vendor_id} , relations: ["productCategories" , "productSubCategories"]});
            const product = await this.productRepository.findOne({where : {firebaseId : item.product_id} , relations: ["categories" , "subCategories"]});

            const vendorProduct = new VendorProduct();
            if(product && vendor){

                console.log("found product to map   " , product);

                vendorProduct.firebaseId = item.auto_id;


                vendorProduct.vendor = vendor.id;
                vendorProduct.product = product.id;
                vendorProduct.price = product.price;
                vendorProduct.name = product.name;
                vendorProduct.description = product.description;


                if(vendor.productCategories)vendor.productCategories = vendor.productCategories.concat(product.categories)
                else vendor.productCategories = product.categories;

                if(vendor.productSubCategories) vendor.productSubCategories = vendor.productSubCategories.concat(product.subCategories)
                else vendor.productSubCategories = product.subCategories;

                await this.vendorRepository.save( vendor)
                    .then(() => {
                        console.log("saved vendor " , vendor);
                    })
                    .catch(err => {
                        console.log(err)
                    })

                await this.vendorProductRepository.save(vendorProduct).then(() => {
                    console.log("added new vendor product " , vendorProduct.name)
                }).catch(err => {
                    console.log("error ocured " , err)
                });
            }


        }
    }

    async addAllProductSubCategories(): Promise<Result> {

        let firebaseSubCategories : DocumentData []= await this.getDocumentListFromFirebase('productSubCategory');
        let firebaseCategorySubCategoryMapping : DocumentData []= await this.getDocumentListFromFirebase('categorySubcategory');

        const nodeCategories : ProductSubCategory[]  = []
        for(const item of firebaseSubCategories){
            const productSubCategory = new ProductSubCategory();
            productSubCategory.name = item.sub_category_name;
            productSubCategory.description = "This is a default description";
            productSubCategory.logo = item.sub_category_pic;
            productSubCategory.isActive = true;
            productSubCategory.firebaseId = item.sub_category_id;
            productSubCategory.weight = item.weight ? item.weight : 0;
            productSubCategory.categories = [];

            for(const mapItem of firebaseCategorySubCategoryMapping) {
                if(mapItem.sub_category_id === item.sub_category_id){
                    const productCategory  = await this.productCategoryRepository
                        .findOne({firebaseId : mapItem.category_id})
                    if(productCategory){
                        productSubCategory.categories.push({"id" : productCategory.id})
                        break;
                    }
                }
            }

            nodeCategories.push(productSubCategory);
        }

        console.log(nodeCategories);

        const response = await this.productSubCategoryRepository.save(nodeCategories);
        return Result.succesful(response);
    }

    async addAllServiceCategories(): Promise<Result> {

        let firebaseCategories : DocumentData []= await this.getDocumentListFromFirebase('serviceCategory');

        const nodeCategories : ServiceCategory[]  = []
        for(const item of firebaseCategories){
            const category = new ServiceCategory();
            category.name = item.english;
            category.description = "This is a default description";
            category.logo = item.thumb;
            category.isActive = true;
            category.firebaseId = item.service_category_id;
            category.weight = item.weight ? item.weight : 0;
            nodeCategories.push(category);
        }

        const response = await this.serviceCategoryRepository.save(nodeCategories);
        return Result.succesful(response);
    }

    async addAllServiceSubCategories(): Promise<Result> {

        let firebaseSubCategories : DocumentData []= await this.getDocumentListFromFirebase('serviceSubLastCategory');

        const nodeCategories : ServiceSubCategory[]  = []
        for(const item of firebaseSubCategories){
            const subCategory = new ServiceSubCategory();
            subCategory.name = item.english;
            subCategory.description = "This is a default description";
            subCategory.logo = item.thumb;
            subCategory.isActive = true;
            subCategory.firebaseId = item.sub_category_id;
            subCategory.weight = item.weight ? item.weight : 0;

            const serviceCategory  = await this.serviceCategoryRepository
                .findOne({firebaseId : item.service_category_id})

            subCategory.category = serviceCategory?.id;

            nodeCategories.push(subCategory);
        }

        const response = await this.serviceSubCategoryRepository.save(nodeCategories);
        return Result.succesful(response);
    }

    async addAllServices(): Promise<Result> {

        let firebaseServices : DocumentData []= await this.getDocumentListFromFirebase('services');

        const nodeCategories : ServiceEntity[]  = []

        for(const item of firebaseServices){
            const serviceEntity = new ServiceEntity();
            serviceEntity.name = item.english;
            serviceEntity.description = item.service_description;
            serviceEntity.logo = item.thumb;
            serviceEntity.isActive = true;
            serviceEntity.firebaseId = item.service_id;
            serviceEntity.weight = item.weight ? item.weight : 0;
            serviceEntity.startAmount = item.start_amount ? item.start_amount : 0;

            const serviceCategory  = await this.serviceCategoryRepository
                .findOne({firebaseId : item.service_category_id})

            serviceEntity.category = serviceCategory?.id;

            const serviceSubCategory  = await this.serviceSubCategoryRepository
                .findOne({firebaseId : item.sub_category_id})

            serviceEntity.subcategory = serviceSubCategory?.id;

            nodeCategories.push(serviceEntity);
        }

        const response = await this.serviceRepository.save(nodeCategories);
        return Result.succesful(response);
    }

    async addAllServicePackages(): Promise<Result> {

        let firebaseServicePackages : DocumentData []= await this.getDocumentListFromFirebase('servicePackages');

        const nodeCategories : ServicePackage[]  = []

        for(const item of firebaseServicePackages){
            const servicePackage = new ServicePackage();
            servicePackage.name = item.service_package_name;
            servicePackage.minItem = item.min_item;
            servicePackage.maxItem = item.max_item;
            servicePackage.unitText = item.price_unit_text;
            servicePackage.isActive = true;
            servicePackage.firebaseId = item.service_package_id;
            servicePackage.weight = item.weight ? item.weight : 0;
            servicePackage.price = item.base_price ? item.base_price : 0;

            const service  = await this.serviceRepository
                .findOne({firebaseId : item.service_id})

            servicePackage.service = service?.id;

            nodeCategories.push(servicePackage);
        }

        const response = await this.servicePackageRepository.save(nodeCategories);
        return Result.succesful(response);
    }

    async addAllDeliveryAreas(): Promise<Result> {

        let firebaseAreas : DocumentData []= await this.getDocumentListFromFirebase('area');

        const nodeAreas : DeliveryArea[]  = []

        for(const item of firebaseAreas){
            const deliveryArea = new DeliveryArea();
            deliveryArea.englishName = item.english;
            deliveryArea.banglaName = item.bangla;
            deliveryArea.code = item.code? item.code: 0;
            deliveryArea.firebaseId = item.area_id;
            nodeAreas.push(deliveryArea);
        }

        const response = await this.deliveryAreaRepository.save(nodeAreas);
        return Result.succesful(response);
    }

    async addAllVendorShop(): Promise<Result> {

        let firebaseVendors : DocumentData []= await this.getDocumentListFromFirebase('vendorshop');

        const nodeVendors : Vendor[]  = []

        for(const item of firebaseVendors){
            const vendor = new Vendor();


            vendor.firebaseId = item.ven_id;
            vendor.name = item.ven_name;
            vendor.address = item.ven_address;
            vendor.image = item.ven_pic;
            vendor.nationalId = item.ven_nid;
            vendor.contact = item.ven_phone;
            vendor.email = item.ven_email;
            vendor.doesProvideSelfDelivery = item.self_delivery? item.self_delivery : false;
            //vendor.email = item.ven_rating;
            vendor.description = item.ven_description;
            vendor.isVerified = item.verified;
            vendor.verifiedBy = item.verified_by;
            vendor.bkashNo = item.bkashNo;
            vendor.nogodNo = item.nogodNo;
            vendor.deliveryPrice = item.deliveryPrice;
            vendor.latitude = item.lat;
            vendor.longitude = item.long;
            vendor.minimumOrderAmount = item.minimum_order_ammount;
            //vendor.bkashNo = item.total_income;
            //vendor.bkashNo = item.total_rating_sum;
            vendor.deliveryTime = item.average_delivery_time;
            vendor.nationalId = item.ven_nid;
            vendor.aToken = item.aToken;

            if(item.delivery_areas){
                vendor.deliveryAreas = item.delivery_areas;
            }

            nodeVendors.push(vendor);
        }

        console.log(nodeVendors);
        const response = await this.vendorRepository.save(nodeVendors);
        return Result.succesful(response);
    }

    async addAllUsers() : Promise<Result> {
        let firebaseCategories : DocumentData []= await this.getDocumentListFromFirebase('users');

        const nodeUsers : User[]  = []
        for(const item of firebaseCategories){

            const user = new User();
            user.firebaseId = item.user_id;
            user.name = item.name? item.name : "";
            user.phone = item.phone? item.phone : "";
            user.address = item.address? item.address : "";
            user.email = item.mail? item.mail : "";
            user.image = item.thumb? item.thumb : "";

            let shouldInsert = true;

            for(let i= 0;i< nodeUsers.length ; i++){
                if(nodeUsers[i].firebaseId ===  user.firebaseId) {
                    shouldInsert = false;
                    break;
                }
            }

            if(shouldInsert)nodeUsers.push(user);
        }

        const response = await this.userRepository.save(nodeUsers);
        return Result.succesful(response);
    }


}
# from pymongo import MongoClient
# from bson import ObjectId

# client = MongoClient("mongodb://localhost:27017/")
# db = client["car_dealership"]
# source_collection = db["newCars"] 


# brands = db["brand"]
# models = db["model"]
# variants = db["variant"] 
# fuel_types = db["fuel_type"]
# body_types = db["body_type"]
# transmissions = db["transmission"]
# images = db["image"]

# brands_map, models_map = {}, {}
# fuel_map, body_map, trans_map = {}, {},{}
# images_map = {}

# def get_or_create(collection, value, key, ref_map):
#     if value not in ref_map:
#         existing = collection.find_one({key: value})
#         if existing:
#             ref_map[value] = existing["_id"]
#         else:
#             _id = collection.insert_one({key: value}).inserted_id
#             ref_map[value] = _id
#     return ref_map[value]

# def insert_images(image_list):
#     image_ids = []
#     for img in image_list:
#         if img not in images_map:
#             existing = images.find_one({"filename": img})
#             if existing:
#                 images_map[img] = existing["_id"]
#             else:
#                 image_id = images.insert_one({"filename": img}).inserted_id
#                 images_map[img] = image_id
#         image_ids.append(images_map[img])
#     return image_ids

# for car in source_collection.find():
#     brand_id = get_or_create(brands, car["brand"], "name", brands_map)

#     model_key = (brand_id, car["model"])
#     if model_key not in models_map:
#         # Handle images
#         image_field = car.get("images", [])
#         image_list = image_field if isinstance(image_field, list) else [image_field]
#         image_ids = insert_images(image_list)

#         model_doc = {
#             "brand_id": brand_id,
#             "name": car["model"],
#             "years_available": car.get("year", []),
#             "image_ids": image_ids
#         }
#         model_id = models.insert_one(model_doc).inserted_id
#         models_map[model_key] = model_id
#     else:
#         model_id = models_map[model_key]

#     for variant_name, details in car["variants"].items():
#         fuel_id = get_or_create(fuel_types, details["fuel_type"], "type", fuel_map)
#         body_id = get_or_create(body_types, details["body_type"], "type", body_map)
#         trans_id = get_or_create(transmissions, details["transmission"], "type", trans_map)

#         variant_doc = {
#             "model_id": model_id,
#             "name": variant_name,
#             "price": details.get("price"),
#             "fuel_type_id": fuel_id,
#             "body_type_id": body_id,
#             "transmission_id": trans_id,
#             "colors": details.get("colors"),
#             "seater": details.get("seater"),
#             "engine": details.get("engine"),
#             "static_features": details.get("static_features", [])
#             # You can add variant-specific image support here too if needed
#         }
#         variants.insert_one(variant_doc)

# print("✅ Data normalized with image references.")

# from pymongo import MongoClient
# from bson import ObjectId

# # Connect to MongoDB
# client = MongoClient("mongodb://localhost:27017/")
# db = client["cars_dealership"]

# # Collections
# cars_col = db["cars"]
# brands_col = db["brands"]
# models_col = db["models"]
# engines_col = db["engine_specs"]
# features_col = db["static_features"]
# colors_col = db["colors"]
# owners_col = db["owners"]
# rtos_col = db["rtos"]
# variants_col = db["variants"]
# trans_col = db["transmissions"]
# fuel_col = db["fuel_types"]
# body_col = db["body_types"]

# # Cache to avoid duplicates
# caches = {
#     "brands": {},
#     "models": {},
#     "engine_specs": {},
#     "static_features": {},
#     "colors": {},
#     "owners": {},
#     "rtos": {},
#     "variants": {},
#     "transmissions": {},
#     "fuel_types": {},
#     "body_types": {}
# }

# # Utility to get or create document and cache
# def get_or_create(col, cache_key, doc):
#     cache = caches[col.name]
#     if cache_key not in cache:
#         _id = col.insert_one({"name": cache_key}).inserted_id
#         cache[cache_key] = _id
#     return cache[cache_key]

# # Normalize all cars
# cars = list(cars_col.find())

# for car in cars:
#     # Normalize brand
#     brand_id = get_or_create(brands_col, car["brand"], {"name": car["brand"]})

#     # Normalize model (needs brand)
#     model_key = f"{car['brand']}|{car['model']}"
#     if model_key not in caches["models"]:
#         model_id = models_col.insert_one({
#             "brand_id": brand_id,
#             "name": car["model"]
#         }).inserted_id
#         caches["models"][model_key] = model_id
#     else:
#         model_id = caches["models"][model_key]

#     # Normalize engine
#     engine = car["engine"]
#     engine_key = f"{engine['hp']}_{engine['cc']}_{engine['torque']}_{engine['mileage']['city']}_{engine['mileage']['highway']}_{engine['ground_clearance_mm']}"
#     if engine_key not in caches["engine_specs"]:
#         engine_id = engines_col.insert_one(engine).inserted_id
#         caches["engine_specs"][engine_key] = engine_id
#     else:
#         engine_id = caches["engine_specs"][engine_key]

#     # Static features
#     feature_ids = []
#     for feat in car["static_features"]:
#         fid = get_or_create(features_col, feat, {"name": feat})
#         feature_ids.append(fid)

#     # Colors
#     color_id = get_or_create(colors_col, car["colors"], {"name": car["colors"]})

#     # Owner
#     owner_id = get_or_create(owners_col, car["Owners"][0], {"name": car["Owners"][0]})

#     # RTO
#     rto_id = get_or_create(rtos_col, car["RTO"], {"code": car["RTO"]})

#     # Variant
#     variant_id = get_or_create(variants_col, car["variant"], {"name": car["variant"]})

#     # Transmission
#     trans_id = get_or_create(trans_col, car["transmission"], {"name": car["transmission"]})

#     # Fuel Type
#     fuel_id = get_or_create(fuel_col, car["fuel_type"], {"name": car["fuel_type"]})

#     # Body Type
#     body_id = get_or_create(body_col, car["body_type"], {"name": car["body_type"]})

#     # Now update car with references only
#     update_fields = {
#         "brand_id": brand_id,
#         "model_id": model_id,
#         "engine_id": engine_id,
#         "feature_ids": feature_ids,
#         "color_id": color_id,
#         "owner_id": owner_id,
#         "rto_id": rto_id,
#         "variant_id": variant_id,
#         "transmission_id": trans_id,
#         "fuel_type_id": fuel_id,
#         "body_type_id": body_id
#     }

#     # Remove old raw fields
#     remove_fields = {
#         "brand": "",
#         "model": "",
#         "variant": "",
#         "transmission": "",
#         "fuel_type": "",
#         "body_type": "",
#         "colors": "",
#         "static_features": "",
#         "Owners": "",
#         "RTO": "",
#         "engine": ""
#     }

#     # Update the car document
#     cars_col.update_one(
#         {"_id": car["_id"]},
#         {
#             "$set": update_fields,
#             "$unset": remove_fields
#         }
#     )

# print("✅ Normalization complete: clean references and no duplicates in cars document.")

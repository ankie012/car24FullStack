# from pymongo import MongoClient
# from bson import ObjectId 
# from bson import json_util

# client = MongoClient("mongodb://localhost:27017")
# db = client["cars_dealership"]  # replace with your DB name

# def get_name(col, oid):
#     doc = db[col].find_one({"_id": oid})
#     return doc["name"] if doc else None

# def get_engine_data(oid):
#     return db["engine_specs"].find_one({"_id": oid}) or {}

# def get_features(oids):
#     names = []
#     for oid in oids:
#         doc = db["static_features"].find_one({"_id": oid})
#         if doc:
#             names.append(doc["name"])
#     return names

# cars = list(db["cars"].find())
# print(f"Fetched {len(cars)} cars")

# flat_cars = []

# for car in cars:
#     try:
#         flat = {
#             "brand": get_name("brands", car["brand_id"]),
#             "model": get_name("models", car["model_id"]),
#             "variant": get_name("variants", car["variant_id"]),
#             "fuel_type": get_name("fuel_types", car["fuel_type_id"]),
#             "transmission": get_name("transmissions", car["transmission_id"]),
#             "body_type": get_name("body_types", car["body_type_id"]),
#             "rto": get_name("rtos", car["rto_id"]),
#             "reg_number": car.get("Reg_number"),
#             "price": car.get("price"),
#             "km_driven": car.get("km_driven"),
#             "seater": car.get("seater"),
#             "year": car.get("year"),
#             "discount": car.get("Discount"),
#             "owners": [get_name("owners", car["owner_id"])] if car.get("owner_id") else [],
#             "colors": get_name("colors", car["color_id"]),
#             "static_features": get_features(car.get("feature_ids", [])),
#             "engine": get_engine_data(car["engine_id"]),
#             "images": car.get("images")
#         }

#         # Optional: skip if any required value is missing
#         if not all([flat["brand"], flat["model"], flat["variant"]]):
#             continue

#         flat_cars.append(flat)
#     except Exception as e:
#         print(f"Error processing car {car.get('_id')}: {e}")

# print(f"Prepared {len(flat_cars)} cars to insert")

# if flat_cars:
#     db["cars_flat"].drop()
#     db["cars_flat"].insert_many(flat_cars)
#     print(f"{len(flat_cars)} documents inserted into 'cars_flat' collection.")

#     with open("cars_flat.json", "w", encoding="utf-8") as f:
#         f.write(json_util.dumps(flat_cars, indent=2, ensure_ascii=False)) 
# else:
#     print("Nothing to insert — check missing reference data.")

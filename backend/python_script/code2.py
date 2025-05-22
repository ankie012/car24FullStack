# from pymongo import MongoClient

# client = MongoClient("mongodb://localhost:27017/")
# db = client["car_dealership"]

# listed_cars_col = db["listed_cars"]
# variant_col = db["variant"]
# flat_cars_col = db["cars"] 

# # Loop through listed cars
# for car in listed_cars_col.find():
#     variant_id = car.get("variant_id")
#     if not variant_id:
#         continue

#     # Find variant name using variant_id
#     variant_doc = variant_col.find_one({"_id": variant_id})
#     if not variant_doc:
#         continue

#     variant_name = variant_doc["name"]

#     # Match flat_cars by variant name
#     flat_car = flat_cars_col.find_one({"variant": variant_name})
#     if not flat_car:
#         continue

#     # Prepare update values
#     update_fields = {
#         "reg_number": flat_car.get("Reg_number", car.get("reg_number")),
#         "km_driven": flat_car.get("km_driven", car.get("km_driven")),
#         "RTO": flat_car.get("RTO", car.get("RTO")),
#         "Owners": flat_car.get("Owners", car.get("Owners")),
#         "Discount": flat_car.get("Discount", car.get("Discount")),
#     }

#     # Update listed car
#     listed_cars_col.update_one(
#         {"_id": car["_id"]},
#         {"$set": update_fields}
#     )

# print("✅ 'listed_cars' updated with data from 'flat_cars' successfully.")

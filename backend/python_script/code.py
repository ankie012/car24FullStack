# from pymongo import MongoClient
# from bson import ObjectId
# from collections import defaultdict, OrderedDict

# # Connect to MongoDB
# client = MongoClient("mongodb://localhost:27017/")
# db = client["car_dealership"]
# source_collection = db["cars"]
# target_collection = db["newCars"] 

# # Group cars by brand and model
# grouped_data = defaultdict(lambda: { 
#     "variants": {},
#     "year": set(),
#     "images": set()
# })

# for doc in source_collection.find():
#     brand = doc["brand"]
#     model = doc["model"]
#     variant = doc["variant"]

#     key = (brand, model)
#     entry = grouped_data[key]

#     # Fill variant-specific details
#     entry["variants"][variant] = {
#         "price": doc["price"],
#         "fuel_type": doc["fuel_type"],
#         "body_type": doc["body_type"],
#         "transmission": doc["transmission"],
#         "colors": doc["colors"],
#         "seater": doc["seater"],
#         "engine": doc["engine"],
#         "static_features": doc.get("static_features", []),
#         "RTO": doc.get("RTO", ""),
#         "Reg_number": doc.get("Reg_number", ""),
#         "Owners": doc.get("Owners", []),
#         "km_driven": doc.get("km_driven", 0),
#         "Discount": doc.get("Discount", "")
#     }

#     # Track additional data
#     entry["year"].add(doc["year"])
#     entry["images"].add(doc["images"])

# # Create final documents with proper order
# final_documents = []

# for (brand, model), data in grouped_data.items():
#     doc = OrderedDict()
#     doc["_id"] = ObjectId()
#     doc["brand"] = brand
#     doc["model"] = model
#     doc["variants"] = data["variants"]
#     doc["year"] = sorted(list(data["year"]))
#     doc["images"] = list(data["images"])
#     final_documents.append(doc)

# # Insert into the new collection
# if final_documents:
#     target_collection.insert_many(final_documents)
#     print(f"Inserted {len(final_documents)} documents.")
# else:
#     print("No documents to insert.")

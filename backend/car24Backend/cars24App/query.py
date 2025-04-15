from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["cars24"]

cars_collection = db["cars1"]
engines_collection = db["engines"] 

# Step 1: Extract all engine specifications from cars
all_engines = cars_collection.find({}, {"engine": 1})  # Get engine data only

unique_engines = {}  # To store unique engines with a generated _id

for car in all_engines:
    engine_spec = car["engine"]
    
    # Create a unique key using engine specs
    engine_key = (engine_spec["hp"], engine_spec["cc"], engine_spec["torque"], 
                  engine_spec["mileage"]["city"], engine_spec["mileage"]["highway"], 
                  engine_spec["ground_clearance_mm"])
    
    if engine_key not in unique_engines:
        unique_engines[engine_key] = {
            "hp": engine_spec["hp"],
            "cc": engine_spec["cc"],
            "torque": engine_spec["torque"],
            "mileage": engine_spec["mileage"],
            "ground_clearance_mm": engine_spec["ground_clearance_mm"]
        }

# Step 2: Insert unique engines into MongoDB
engine_docs = list(unique_engines.values())
engines_collection.insert_many(engine_docs)

print(f"Inserted {len(engine_docs)} unique engines into 'engines' collection.")

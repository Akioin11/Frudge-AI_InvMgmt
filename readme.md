
# Smart Inventory Management System for Fridges

An intelligent fridge inventory management solution that leverages **computer vision** and **Gemma AI** to track items, suggest recipes, and automate grocery ordering. Designed to make kitchen management smarter and more efficient.

---

## Features

**Fridge Item Recognition**  
- Uses integrated cameras to detect and identify items inside your fridge.  
- Tracks item names, quantities, and expiration dates.

**Smart Recipe Suggestions**  
- Gemma AI generates recipe ideas based on available ingredients.  
- Considers item combinations and quantity limits to recommend practical meals.

**Automated Grocery Ordering**  
- Automatically detects low-stock or missing items.  
- Suggests replenishment and places online grocery orders via integrated services.

**Real-time Inventory Dashboard**  
- View what’s inside your fridge remotely.  
- Get updates on stock levels, freshness, and recommended actions.

**Gemma AI Backend**  
- Gemma AI runs on a dedicated AWS server with no external API dependencies.  
- Handles natural language processing and recipe recommendation tasks locally.

---

## Tech Stack

- **Computer Vision Module** (YOLOv8 + OpenCV)  
- **Gemma AI** running on AWS EC2 for on-premise NLP tasks  
- **Flutter** or **React** for cross-platform user dashboard (web/mobile)  
- **AWS S3** for image storage  
- **AWS Lambda** for automation tasks (optional)

---

## How It Works

1. The camera captures images inside the fridge periodically or on-demand.  
2. The system uses computer vision to detect and classify items.  
3. Gemma AI processes the inventory and suggests meal plans based on what’s available.  
4. If stock is low, the system will suggest an online order or auto-order if enabled.

---

## Example Workflow

- **Detected:** 2 eggs, 1/2 cup of milk, 3 tomatoes, cheese slices  
- **Gemma Suggests:** "Tomato & Cheese Omelette - Along with full Recipe"
- **Low Stock Alert:** Milk is below 1 cup, suggest reordering milk carton

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Akioin11/Frudge-AI_InvMgmt
cd smart-fridge-inventory
```

### 2. Set Up Backend (Gemma AI on AWS)

- Launch an EC2 instance and deploy Gemma AI model  
- Connect your instance to the main application backend  
- Ensure private networking (no external APIs used)

### 3. Install Dependencies (Local App)

For the dashboard (e.g., Flutter):

```bash
flutter pub get
flutter run
```

### 4. Configure Cameras

- Attach the fridge camera system and configure it to push images to AWS S3 or directly to your CV module.

---

## Key Modules

- **Vision Engine**: Detects items inside the fridge with bounding boxes and confidence scores.  
- **Inventory Tracker**: Maintains item counts, expiry info, and fridge conditions.  
- **Gemma AI Core**: Suggests recipes and shopping actions based on the fridge’s real-time state.  
- **Ordering Engine**: Integrates with grocery APIs for order placement (customizable per region).

---

## Future Plans

- Voice-controlled interface for fridge status  
- Smart notifications via mobile/web  
- Energy consumption tracking  
- Integration with IoT smart kitchen appliances

---

## Contributing

Pull requests are welcome! Please fork the repository and submit improvements.

---

## License

MIT License.

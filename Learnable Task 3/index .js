// ============================================================
// Laundry Management System - OOP Implementation
// ============================================================

/**
 * LaundryItem class represents a type of laundry service
 * (e.g., washing, dry cleaning, ironing).
 */
class LaundryItem {
  // Static property: tracks the total number of LaundryItem types created
  static totalItemTypes = 0;

  /**
   * @param {string} name - Name of the laundry item/service (e.g., "Shirt Wash")
   * @param {number} pricePerUnit - Price per unit in dollars
   * @param {string} category - Category of the service (e.g., "Wash", "Dry Clean", "Iron")
   */
  constructor(name, pricePerUnit, category) {
    this.name = name;
    this.pricePerUnit = pricePerUnit;
    this.category = category;

    // Increment the class-level counter each time a new item type is created
    LaundryItem.totalItemTypes++;
  }

  /**
   * Returns a formatted string with the item's details.
   * @returns {string}
   */
  getDetails() {
    return `${this.name} [${this.category}] - $${this.pricePerUnit.toFixed(2)} per unit`;
  }

  /**
   * Calculates the discounted price for this item.
   * @param {number} percent - Discount percentage (e.g., 10 for 10%)
   * @returns {number} The price after discount
   */
  applyDiscount(percent) {
    const discount = this.pricePerUnit * (percent / 100);
    return parseFloat((this.pricePerUnit - discount).toFixed(2));
  }

  /**
   * Static method: returns the total number of LaundryItem instances created.
   * @returns {number}
   */
  static getTotalItemTypes() {
    return LaundryItem.totalItemTypes;
  }
}

// ============================================================

/**
 * Order class represents a customer's laundry order,
 * containing one or more LaundryItems.
 */
class Order {
  // Static property: tracks the total number of orders placed
  static totalOrders = 0;

  /**
   * @param {string} orderId - Unique identifier for the order
   * @param {string} customerName - Name of the customer
   */
  constructor(orderId, customerName) {
    this.orderId = orderId;
    this.customerName = customerName;
    this.items = [];         // Array of LaundryItem instances
    this.status = "Pending"; // Default status

    // Increment the class-level counter each time a new order is created
    Order.totalOrders++;
  }

  /**
   * Adds a LaundryItem to this order.
   * @param {LaundryItem} item
   */
  addItem(item) {
    this.items.push(item);
    console.log(`  Added "${item.name}" to Order ${this.orderId}`);
  }

  /**
   * Calculates the total cost of all items in this order.
   * @returns {number}
   */
  calculateTotal() {
    const total = this.items.reduce((sum, item) => sum + item.pricePerUnit, 0);
    return parseFloat(total.toFixed(2));
  }

  /**
   * Updates the status of the order.
   * @param {string} newStatus - The new status (e.g., "In Progress", "Completed")
   */
  updateStatus(newStatus) {
    const oldStatus = this.status;
    this.status = newStatus;
    console.log(`  Order ${this.orderId} status: "${oldStatus}" → "${newStatus}"`);
  }

  /**
   * Static method: returns the total number of Order instances created.
   * @returns {number}
   */
  static getTotalOrders() {
    return Order.totalOrders;
  }
}

// ============================================================
// USAGE / DEMO SECTION
// ============================================================

console.log("=== Laundry Management System ===\n");

// --- Create LaundryItem instances ---
const shirtWash = new LaundryItem("Shirt Wash", 3.50, "Wash");
const suitDryClean = new LaundryItem("Suit Dry Clean", 12.00, "Dry Clean");
const pantsIron = new LaundryItem("Pants Iron", 2.00, "Iron");

console.log("--- Laundry Items Created ---");
console.log(shirtWash.getDetails());
console.log(suitDryClean.getDetails());
console.log(pantsIron.getDetails());

// --- Demonstrate applyDiscount ---
console.log(`\nSuit Dry Clean with 15% discount: $${suitDryClean.applyDiscount(15)}`);

// --- Static method: total item types ---
console.log(`\nTotal laundry item types registered: ${LaundryItem.getTotalItemTypes()}`);

// --- Create Order instances ---
console.log("\n--- Creating Orders ---");
const order1 = new Order("ORD-001", "Alice Johnson");
order1.addItem(shirtWash);
order1.addItem(suitDryClean);

const order2 = new Order("ORD-002", "Bob Smith");
order2.addItem(pantsIron);
order2.addItem(shirtWash);

// --- Calculate totals ---
console.log("\n--- Order Totals ---");
console.log(`Order ${order1.orderId} (${order1.customerName}): $${order1.calculateTotal()}`);
console.log(`Order ${order2.orderId} (${order2.customerName}): $${order2.calculateTotal()}`);

// --- Update order status ---
console.log("\n--- Updating Order Status ---");
order1.updateStatus("In Progress");
order1.updateStatus("Completed");
order2.updateStatus("In Progress");

// --- Static method: total orders ---
console.log(`\nTotal orders placed: ${Order.getTotalOrders()}`);

console.log("\n=== Done ===");

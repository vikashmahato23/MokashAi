// Shared in-memory data store for the demo
// In a real application, this would be a database

export let customers = [
  {"id": 1, "firstName": "John", "lastName": "Smith", "email": "john.smith@techcorp.com", "phone": "555-0101", "company": "TechCorp", "position": "Senior Developer", "status": "active", "dateCreated": "2024-01-15T10:30:00Z", "lastUpdated": "2024-12-01T14:22:00Z", "address": {"street": "123 Main St", "city": "San Francisco", "state": "CA", "zipCode": "94105"}, "tags": ["enterprise", "technology", "priority"], "revenue": 125000},
  {"id": 2, "firstName": "Sarah", "lastName": "Johnson", "email": "sarah.j@innovate.io", "phone": "555-0102", "company": "Innovate.io", "position": "Product Manager", "status": "active", "dateCreated": "2024-02-20T09:15:00Z", "lastUpdated": "2024-11-28T16:45:00Z", "address": {"street": "456 Oak Ave", "city": "New York", "state": "NY", "zipCode": "10001"}, "tags": ["startup", "growth"], "revenue": 85000},
  {"id": 3, "firstName": "Michael", "lastName": "Williams", "email": "m.williams@globalfinance.com", "phone": "555-0103", "company": "Global Finance", "position": "CFO", "status": "inactive", "dateCreated": "2023-11-10T14:20:00Z", "lastUpdated": "2024-06-15T10:30:00Z", "address": {"street": "789 Wall St", "city": "New York", "state": "NY", "zipCode": "10005"}, "tags": ["finance", "enterprise"], "revenue": 250000},
  {"id": 4, "firstName": "Emily", "lastName": "Brown", "email": "emily.brown@creative.agency", "phone": "555-0104", "company": "Creative Agency", "position": "Creative Director", "status": "active", "dateCreated": "2024-03-05T11:00:00Z", "lastUpdated": "2024-12-10T09:15:00Z", "address": {"street": "321 Design Blvd", "city": "Los Angeles", "state": "CA", "zipCode": "90001"}, "tags": ["agency", "design", "marketing"], "revenue": 95000},
  {"id": 5, "firstName": "Robert", "lastName": "Davis", "email": "robert.d@logistics.net", "phone": "555-0105", "company": "Logistics Plus", "position": "Operations Manager", "status": "pending", "dateCreated": "2024-11-01T08:45:00Z", "lastUpdated": "2024-12-08T15:30:00Z", "address": {"street": "555 Shipping Way", "city": "Chicago", "state": "IL", "zipCode": "60601"}, "tags": ["logistics", "operations"], "revenue": 75000},
  {"id": 6, "firstName": "Jessica", "lastName": "Miller", "email": "j.miller@healthtech.com", "phone": "555-0106", "company": "HealthTech Solutions", "position": "VP of Sales", "status": "active", "dateCreated": "2024-01-22T13:30:00Z", "lastUpdated": "2024-12-05T11:20:00Z", "address": {"street": "888 Medical Dr", "city": "Boston", "state": "MA", "zipCode": "02101"}, "tags": ["healthcare", "technology", "enterprise"], "revenue": 180000},
  {"id": 7, "firstName": "David", "lastName": "Garcia", "email": "david.garcia@retail.com", "phone": "555-0107", "company": "Retail Giants", "position": "Store Manager", "status": "active", "dateCreated": "2024-04-10T10:00:00Z", "lastUpdated": "2024-11-30T14:15:00Z", "address": {"street": "222 Commerce St", "city": "Dallas", "state": "TX", "zipCode": "75201"}, "tags": ["retail", "consumer"], "revenue": 65000},
  {"id": 8, "firstName": "Lisa", "lastName": "Martinez", "email": "lisa.m@education.org", "phone": "555-0108", "company": "EduTech Platform", "position": "Head of Content", "status": "inactive", "dateCreated": "2023-09-15T09:30:00Z", "lastUpdated": "2024-07-20T16:00:00Z", "address": {"street": "777 Learning Ave", "city": "Seattle", "state": "WA", "zipCode": "98101"}, "tags": ["education", "content"], "revenue": 55000},
  {"id": 9, "firstName": "James", "lastName": "Rodriguez", "email": "james.r@automotive.com", "phone": "555-0109", "company": "Auto Innovations", "position": "Engineering Lead", "status": "active", "dateCreated": "2024-02-28T14:45:00Z", "lastUpdated": "2024-12-07T10:30:00Z", "address": {"street": "999 Motor Way", "city": "Detroit", "state": "MI", "zipCode": "48201"}, "tags": ["automotive", "engineering", "innovation"], "revenue": 110000},
  {"id": 10, "firstName": "Jennifer", "lastName": "Wilson", "email": "jennifer.w@consulting.biz", "phone": "555-0110", "company": "Strategic Consulting", "position": "Senior Consultant", "status": "active", "dateCreated": "2024-05-15T11:15:00Z", "lastUpdated": "2024-12-09T13:45:00Z", "address": {"street": "444 Advisory Ln", "city": "Washington", "state": "DC", "zipCode": "20001"}, "tags": ["consulting", "strategy"], "revenue": 145000},
  {"id": 11, "firstName": "Christopher", "lastName": "Anderson", "email": "chris.anderson@media.tv", "phone": "555-0111", "company": "Media Networks", "position": "Content Producer", "status": "pending", "dateCreated": "2024-10-20T08:30:00Z", "lastUpdated": "2024-12-06T15:20:00Z", "address": {"street": "666 Broadcast Ave", "city": "Atlanta", "state": "GA", "zipCode": "30301"}, "tags": ["media", "entertainment"], "revenue": 78000},
  {"id": 12, "firstName": "Amanda", "lastName": "Thomas", "email": "amanda.t@realestate.com", "phone": "555-0112", "company": "Property Group", "position": "Real Estate Agent", "status": "active", "dateCreated": "2024-03-18T12:00:00Z", "lastUpdated": "2024-12-04T09:30:00Z", "address": {"street": "111 Property St", "city": "Miami", "state": "FL", "zipCode": "33101"}, "tags": ["real estate", "sales"], "revenue": 92000},
  {"id": 13, "firstName": "Daniel", "lastName": "Jackson", "email": "daniel.j@energy.co", "phone": "555-0113", "company": "Green Energy Co", "position": "Sustainability Director", "status": "active", "dateCreated": "2024-06-01T10:45:00Z", "lastUpdated": "2024-12-08T14:00:00Z", "address": {"street": "333 Solar Way", "city": "Phoenix", "state": "AZ", "zipCode": "85001"}, "tags": ["energy", "sustainability", "green"], "revenue": 105000},
  {"id": 14, "firstName": "Michelle", "lastName": "White", "email": "michelle.white@fashion.style", "phone": "555-0114", "company": "Fashion Forward", "position": "Brand Manager", "status": "inactive", "dateCreated": "2023-12-10T13:15:00Z", "lastUpdated": "2024-08-25T11:30:00Z", "address": {"street": "888 Style Ave", "city": "Los Angeles", "state": "CA", "zipCode": "90210"}, "tags": ["fashion", "retail", "luxury"], "revenue": 88000},
  {"id": 15, "firstName": "Kevin", "lastName": "Harris", "email": "kevin.h@sports.net", "phone": "555-0115", "company": "Sports Management", "position": "Athletic Director", "status": "active", "dateCreated": "2024-04-22T09:00:00Z", "lastUpdated": "2024-12-03T16:15:00Z", "address": {"street": "555 Stadium Rd", "city": "Denver", "state": "CO", "zipCode": "80201"}, "tags": ["sports", "management"], "revenue": 72000}
];

export let nextId = customers.length + 1;

export function addCustomer(customer: any) {
  const customerWithId = {
    ...customer,
    id: nextId++,
    dateCreated: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
  };
  customers.push(customerWithId);
  return customerWithId;
}

export function updateCustomer(id: number, updatedCustomer: any) {
  const index = customers.findIndex(c => c.id === id);
  if (index === -1) return null;
  
  customers[index] = {
    ...updatedCustomer,
    id,
    lastUpdated: new Date().toISOString(),
  };
  return customers[index];
}

export function deleteCustomer(id: number) {
  const index = customers.findIndex(c => c.id === id);
  if (index === -1) return false;
  
  customers.splice(index, 1);
  return true;
}

export function getCustomer(id: number) {
  return customers.find(c => c.id === id);
}

export function getCustomers() {
  return customers;
}
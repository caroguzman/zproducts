/**
 * 
 * @On(event = { "CREATE" }, entity = "testprojectSrv.Purchases")
 * @param {Object} request - User information, tenant-specific CDS model, headers and query parameters
*/
module.exports = async function(request) {
    const { Purchases, Customers } = cds.entities;

    // Extract the data from the request
    const { purchaseValue, customer_ID } = request.data;

    // Calculate reward points
    const rewardPoints = Math.floor(purchaseValue / 10);

    // Update the purchase record with calculated reward points
    request.data.rewardPoints = rewardPoints;

    // Fetch the customer record
    const customer = await SELECT.one.from(Customers).where({ ID: customer_ID });

    // Ensure customer exists
    if (!customer) {
        return request.error(404, `Customer with ID ${customer_ID} not found`);
    }

    // Update the customer's total purchase value and total reward points
    customer.totalPurchaseValue += purchaseValue;
    customer.totalRewardPoints += rewardPoints;

    // Update the customer record in the database
    await UPDATE(Customers).set({
        totalPurchaseValue: customer.totalPurchaseValue,
        totalRewardPoints: customer.totalRewardPoints
    }).where({ ID: customer_ID });
};
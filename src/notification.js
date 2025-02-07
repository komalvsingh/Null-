
import { checkExpiringItems,sendEmailNotification } from "./ai_expiry_checker";

async function notifyExpiry() {
    const expiringItems = await checkExpiringItems();

    expiringItems.forEach(item => {
        sendEmailNotification({
            to: item.storeEmail,
            subject: `⚠️ Food Expiry Alert: ${item.name}`,
            body: `The item "${item.name}" is expiring on ${item.expiryDate}. Please take action!`,
        });
    });

    console.log("✔ Expiry notifications sent.");
}

export { notifyExpiry };

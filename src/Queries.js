require("firebase/app");
require("firebase/database");
require("firebase/firestore");
import { logErrorActivity } from "./Logger";

export async function findNewest(db, locale) {
    let collection = db.collection("en-blogposts");
    if (locale === "fi") {
        collection = db.collection("fi_blogposts");
    }
    try {
        let data = [];
        const result = await collection
            .orderBy("date", "desc")
            .limit(5)
            .get();
        result.forEach((element) => {
            // Added this 26.3.2021
            let objectToPush = element.data();
            objectToPush["id"] = element.id;
            data.push(objectToPush);
        });
        return data;
    } catch (error) {
        logErrorActivity("blog", locale, "findnewest", error, 500);
        return ["error"];
    }
}

export async function findById(db, locale, id) {
    let collection = db.collection("en-blogposts");
    if (locale === "fi") {
        collection = db.collection("fi_blogposts");
    }
    try {
        const result = await collection.doc(id).get();
        if(result.exists){

            return [result.data().view];
        }
        else{
            return ["error"];
        }
    } catch (error) {
        logErrorActivity("blog", locale, "findnewest", error, 500);
        return ["error"];
    }
}

export function getByQuery(db, queryParams, locale) {
    if (queryParams.queryType === "Time") {
        return findByTime(db, queryParams, locale);
    } else if (queryParams.queryType === "Series") {
        return findBySeries(db, queryParams, locale);
    } else {
        return ["error"];
    }
}

async function findByTime(db, queryParams, locale) {
    if (queryParams.query === "Newest") {
        return await findNewest(db, locale);
    } else if (queryParams.query === "Oldest") {
        return await getOldest(db, locale);
    }
}

async function getOldest(db, locale) {
    let collection = db.collection("en-blogposts");
    if (locale === "fi") {
        collection = db.collection("fi_blogposts");
    }
    try {
        let data = [];
        const result = await collection
            .orderBy("date", "asc")
            .limit(5)
            .get();
        result.forEach((element) => {
            // Added this 26.3.2021
            let objectToPush = element.data();
            objectToPush["id"] = element.id;
            data.push(objectToPush);
        });
        return data;
    } catch (error) {
        logErrorActivity("blog", locale, "getoldest", error, 500);
        return ["error"];
    }
}

async function findBySeries(db, queryParams, locale) {
    let collection = db
        .collection("en-blogposts")
        .where("series", "==", queryParams.query.toLowerCase());
    if (locale === "fi") {
        collection = db
            .collection("fi_blogposts")
            .where("series", "==", queryParams.query.toLowerCase());
    }
    try {
        let data = [];
        const result = await collection.orderBy("date", "desc").get();
        result.forEach((element) => {
            // Added this 26.3.2021
            let objectToPush = element.data();
            objectToPush["id"] = element.id;
            console.log(objectToPush);
            data.push(objectToPush);
        });
        return data;
    } catch (error) {
        console.log(error);
        logErrorActivity("blog", locale, "findbyseries", error, 500);
        return ["error"];
    }
}

export async function getHotNews(db, locale) {
    let collection = db.collection("en-hot-news");
    if (locale === "fi") {
        collection = db.collection("fi-hot-news");
    }
    try {
        let data = [];
        const result = await collection.get();
        result.forEach((element) => {
            // Added this 26.3.2021
            let objectToPush = element.data();
            objectToPush["id"] = element.id;
            data.push(objectToPush);
        });
        return data;
    } catch (error) {
        logErrorActivity("news", locale, "getHotNews", error, 500);
        return ["error"];
    }
}

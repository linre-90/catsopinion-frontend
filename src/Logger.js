import axios from "axios";
const connectionString =
    " https://conw3lll13.execute-api.eu-north-1.amazonaws.com/default/logger";

const axiosSettings = {
    timeout: 6000,
    maxRedirects: 0,
};

export function logPageActivity(page, locale, screen) {
    if (process.env.NODE_ENV == "production") {
        axios
            .post(
                connectionString,
                {
                    type: "PAGE",
                    visitedPage: page,
                    link: "",
                    local: locale,
                    message: "",
                    statuscode: 200,
                    time: new Date(),
                    screenWidth: screen,
                },
                axiosSettings
            )
            .then()
            .catch((error) => {
                if (error.response) {
                    return error.response.status;
                }
            });
    }
}

export function logClickActivity(page, locale, link, screen) {
    if (process.env.NODE_ENV == "production") {
        axios
            .post(
                connectionString,
                {
                    type: "CLICK",
                    visitedPage: page,
                    link: link,
                    message: "",
                    statuscode: 200,
                    local: locale,
                    time: new Date(),
                    screenWidth: screen,
                },
                axiosSettings
            )
            .then()
            .catch((error) => {
                if (error.response) {
                    return error.response.status;
                }
            });
    }
}

export function logErrorActivity(
    page,
    locale,
    link,
    originError,
    statusCode,
    screen
) {
    if (process.env.NODE_ENV == "production") {
        axios
            .post(
                connectionString,
                {
                    type: "ERROR",
                    visitedPage: page,
                    link: link,
                    local: locale,
                    message: originError,
                    statuscode: statusCode,
                    time: new Date(),
                    screenWidth: screen,
                },
                axiosSettings
            )
            .then()
            .catch((error) => {
                if (error.response) {
                    return error.response.status;
                }
            });
    }
}

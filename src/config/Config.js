export const MyConfig = {
  
    getBaseUrl: () => {
        if (process.env.NODE_ENV === "development") return process.env.REACT_APP_LOCAL_API_URL;
        else if (process.env.NODE_ENV === "production") return process.env.REACT_APP_API_URL;
        else if (process.env.NODE_ENV === "test") return process.env.REACT_APP_DEV_API_URL;
    },
    getDomain: () => {
        if (process.env.NODE_ENV === "development") return process.env.REACT_APP_LOCAL_URL;
        else if (process.env.NODE_ENV === "production") return process.env.REACT_APP_hackathon_URL;
        else if (process.env.NODE_ENV === "test") return process.env.REACT_APP_LOCAL_URL;
    }
}
// REACT_APP_LOCAL_API_URL
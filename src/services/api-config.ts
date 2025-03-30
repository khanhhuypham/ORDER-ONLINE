export const ApiConfig = {
    API_URL: process.env.REACT_APP_API_URL,
    IMAGE_URL: process.env.REACT_APP_IMAGE_URL,
    PROJECT_ID: {
        USER_SERVICE: 1182,
    },
};



export const API_UPLOAD_ROUTER = {
  VERSION: "v1",
  get API_UPLOAD() {
    return `${this.VERSION}/upload/files`;
  },
  get API_SHORT() {
    return `${this.VERSION}/upload/short`;
  },
};

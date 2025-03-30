import { API_UPLOAD_ROUTER, ApiConfig } from "../services/api-config";


const imageCache: { [key: string]: string } = {};

export function getSrcImage(url: string): Promise<string> {
    const token = "";
    return new Promise((resolve) => {
        // Return a Promise
        // Check if the image URL is already in the cache
        if (imageCache[url]) {
            resolve(imageCache[url]);
            return;
        }

        try {
            const src = `${ApiConfig.API_URL}/api/${API_UPLOAD_ROUTER.API_SHORT}?path=${url}`;
            const options: RequestInit = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    ProjectId: ApiConfig.PROJECT_ID.USER_SERVICE.toString(),
                },
            };

            fetch(src, options)
                .then((res) => res.blob())
                .then((blob) => {
                    const imageUrl = URL.createObjectURL(blob);
                    imageCache[url] = imageUrl; // Cache the image URL
                    resolve(imageUrl); // Resolve the Promise with the created URL
                })
                .catch((error) => {
                    console.error(error);
                    resolve(url); // Resolve with the original URL in case of an error
                });
        } catch (error) {
            console.error(error);
            resolve(url); // Resolve with the original URL in case of an error
        }
    });
}

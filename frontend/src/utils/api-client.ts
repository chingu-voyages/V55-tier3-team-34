import {MayBe} from "@/utils/type";


export function ApiClient() {
    const query = async <T>(
        url: string,
        cache: RequestCache,
        credentials: RequestCredentials,
        tags?: MayBe<string>
    ) => {
       try {
           const response = await fetch(`api/${url}`, {
                  cache,
                  credentials,
                  next: {
                      tags: [tags ?? ""]
                  }
           })
           if(!response.ok) {
               if(!response.ok) {
                   throw new Error(`Status code: ${response.status}, Message: ${response.statusText}`)
               }
           }
           return await response.json() as T
       } catch (e) {
               throw e;
       }
    }

    const mutate = async <Q , T>(
        url: string ,
        cache: RequestCache ,
        credentials: RequestCredentials,
        payload: Q,
        method: "PUT" | 'POST' | 'PATCH' | 'DELETE'
    ) => {
        try {
            const isFormData = payload instanceof FormData;
            const res = await fetch(`api/${url}`,
                {
                    method,
                    credentials,
                    headers: {
                        ...(isFormData ? {} : { 'Content-Type': 'application/json' })
                    },
                    cache,
                    body: isFormData ? payload: JSON.stringify(payload)
                }
            )
            if(!res.ok) {
                throw new Error(`Status code: ${res.status}, Message: ${res.statusText}`)
            }
            return await res.json() as T

        }catch (e) {
            throw e;
        }
    }

    return {
        query,
        mutate
    }

}

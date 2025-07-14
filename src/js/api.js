//Función que realiza las comunicaciones con la API, como peticiones HTTP con Fetch  (GET, POST, PUT, DELETE).
export const api = {
    URL: 'http://localhost:3000',

    //Función GET
    get: async param => {
        try {
            const response = await fetch(`${api.URL}${param}`);
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            return await response.json();
        }catch (error) {
            console.error('Error en la petición GET:', error);
            throw error;
        }
    },

    //Función POST
    post: async (param, data) => {
        try {
            const response = await fetch(`${api.URL}/${param}`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)  
            });
          if (!response.ok) {
            throw new Error ('Error al crear los datos');
          }
          return await response.json();
        } catch (error) {
            console.error('Error en la petición GET:', error);
            throw error;            
        }
    },

    //FUnción PUT
    put: async (param, data) => {
        try {
            const response = await fetch(`${api.URL}/${param}`,{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)  
            });
          if (!response.ok) {
            throw new Error ('Error al actualizar los datos');
          }
          return await response.json();
        } catch (error) {
            console.error('Error en la petición PUT:', error);
            throw error;            
        }
    },

    //Función DELETE
    delete: async param => {
        try {
            const response = await fetch(`${api.URL}/${param}`,{
                method: 'DELETE',
            });
          if (!response.ok) {
            throw new Error ('Error al eliminar los datos');
          }
          return await response.json();
        } catch (error) {
            console.error('Error en la petición DELETE:', error);
            throw error;            
        }        
    }
};
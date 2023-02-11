import React from "react";

import "../../styles/cookiepolicy.css"

export const CookiePolicy = () => {
    return (
        <div className="cookies-div">
            <h1 className="pt-5 pb-5 text-center">Política de Cookies</h1>
            <p className="mx-5 fs-6">Nuestro sitio web utiliza cookies para mejorar la experiencia de navegación de nuestros usuarios y
                para entender mejor cómo se utiliza el sitio. Las cookies son pequeños archivos de texto que se almacenan en el dispositivo del 
                usuario cuando visita un sitio web.</p>
            <h6 className="mx-5 mb-3 ">Utilizamos diferentes tipos de cookies con diferentes fines:</h6>
            <p className="mx-5 fs-6 "><b>Cookies técnicas:</b> son esenciales para el correcto funcionamiento del sitio y permiten a los
                usuarios navegar y utilizar sus funciones.</p>
            <p className="mx-5 fs-6"><b> Cookies de análisis:</b> nos permiten recopilar información sobre cómo los usuarios utilizan el sitio,
             como las páginas visitadas y las acciones realizadas en el sitio. Esta información nos ayuda a mejorar la experiencia de usuario y a optimizar el sitio.</p>
            <p className="mx-5 fs-6"><b> Cookies publicitarias: </b> se utilizan para mostrar publicidad personalizada en base a las preferencias de los usuarios
              y a su comportamiento de navegación. </p>
            <p className="mx-5 fs-6">Puede aceptar o rechazar las cookies modificando la configuración de su navegador. Sin embargo, tenga en cuenta que algunas 
            partes del sitio pueden no funcionar correctamente si se desactivan las cookies.</p>
            <p className="mx-5 fs-6">Al navegar por nuestro sitio web, acepta el uso de cookies de acuerdo con esta política.</p>
            <p className="mx-5 fs-6 mb-0 pb-3">Nota: Esta política puede ser actualizada en cualquier momento, por lo que le recomendamos revisarla periódicamente para estar informado sobre cualquier cambio.</p>
        </div>
    )
}
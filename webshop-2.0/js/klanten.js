const mangaReviews = [
    "Geweldige webshop! Ze hebben een breed scala aan anime-merchandise en de prijzen zijn redelijk. Snelle levering en uitstekende klantenservice.",
    "Leuke selectie manga's hier. Ik heb net mijn favoriete serie gekocht. De levering duurde een beetje langer dan verwacht, maar het was het wachten waard.",
    "Deze webshop is de hemel voor otaku's! Ze hebben zoveel verschillende anime- en manga-items. Ik kan hier uren winkelen.",
    "Ik ben een enorme Naruto-fan en deze webshop heeft alle Naruto-merchandise die ik nodig heb. Ik ben dolblij met mijn aankopen hier.",
    "Ik hou van Studio Ghibli, en deze webshop heeft schattige Ghibli-merchandise. De prijzen zijn eerlijk en de kwaliteit is goed.",
    "Als je van mecha-anime houdt, zul je deze webshop geweldig vinden. Ze hebben coole mecha-figuurtjes en modelkits. Ik heb er al een paar verzameld.",
    "Sailor Moon is mijn jeugdheldin, en ik ben blij dat ik hier Sailor Moon-merchandise heb gevonden. Snelle verzending en goed verpakt.",
    "Dragon Ball Z is mijn favoriete serie, en deze webshop heeft geweldige Dragon Ball Z-merchandise. Ik ben een trotse eigenaar van een aantal actiefiguren.",
    "Deze webshop heeft een fantastische selectie van anime T-shirts. Ik heb er een paar gekocht en ze zitten comfortabel en zien er geweldig uit.",
    "Ik was op zoek naar een specifieke manga-serie en vond deze webshop. Ze hadden het boek dat ik zocht en nog veel meer. Echt een geweldige vondst!"
];



document.addEventListener("DOMContentLoaded", () => {
    fetch("https://randomuser.me/api/?results=10")
        .then(response => response.json())
        .then(data => {
            const customersContainer = document.querySelector('.customers-container');
            data.results.forEach(customer => {
                const customerDiv = document.createElement('div');
                customerDiv.classList.add('customer');
                const randomReview = mangaReviews[Math.floor(Math.random() * mangaReviews.length)];
                customerDiv.innerHTML = `
                    <img src="${customer.picture.large}" alt="${customer.name.first}">
                    <p>${customer.name.title} ${customer.name.first} ${customer.name.last}</p>
                    <p>${customer.location.country}</p>
                    <div class="review">${randomReview}</div>
                `;
                customersContainer.appendChild(customerDiv);
            });
        });
});


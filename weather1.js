async function getWeather() {
            const location = document.getElementById('location').value;
            if (!location) {
                alert('Please enter a location');
                return;
            }
            
            const apiKey = '669ac16f363a40988db61059250302';
            const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=2&aqi=yes`;
            
            document.getElementById('spinner').style.display = 'block';
             // Show spinner
            
            try {
                const response = await fetch(url);
                const data = await response.json();
                const current = data.current;
                const tomorrow = data.forecast.forecastday[1].day;
                document.getElementById('weather-result').innerHTML = `
                    <h3>${data.location.name}, ${data.location.country}</h3>
                    <p>Current Temperature: ${current.temp_c}°C</p>
                    <p>Current Condition: ${current.condition.text}</p>
                    <img src="${current.condition.icon}" alt="Weather icon">
                    <h3>Tomorrow's Forecast</h3>
                    <p>Temperature: ${tomorrow.avgtemp_c}°C</p>
                    <p>Condition: ${tomorrow.condition.text}</p>
                    <img src="${tomorrow.condition.icon}" alt="Weather icon">
                `;
            } catch (error) {
                document.getElementById('weather-result').innerHTML = '<p style="color:red;">Could not fetch weather data. Please try again.</p>';
            } finally {
                document.getElementById('spinner').style.display = 'none'; 
                // Hide spinner
            }
        }
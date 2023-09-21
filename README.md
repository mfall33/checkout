.env files are scattered across .env and next.config.js

WHAT NEEDS DONE

--Swap any non caching API calls over to AXIOS
--Figure out when to initiate payment intents and where to store them securely
Think about serialization deserialization of Cookies ^ OR session storage
if session.paymentIntent use session.paymentIntent else stripe.createPaymentIntent
--Need to try and bring screens away from "use client" utilize the server more.
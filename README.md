.env files are scattered across .env and next.config.js

WHAT NEEDS DONE

--Swap any non caching API calls over to AXIOS
--Figure out when to initiate payment intents and where to store them securely
Think about serialization deserialization of Cookies ^ OR session storage
if session.paymentIntent use session.paymentIntent else stripe.createPaymentIntent
--Need to try and bring screens away from "use client" utilize the server more.
--Need to implement remove cart item functionality
--Need to implement edit quantity functionality
--Need to test out 3ds and 3ds2 cards on stripe implementation
--Payment success screen should maybe mention receiving an email about the order instead of saying the order has been confirmed (can send out an email from stripe webhook API if successful)
--Initial load issues with zustand need fixed
--Mobile responsiveness
--Internal code cleanup and reflect on project structure (make changes where best suited)
.env files are scattered across .env and next.config.js

WHAT NEEDS DONE

--Swap any non caching API calls over to AXIOS
--Need to try and bring screens away from "use client" utilize the server more.
--Payment success screen (ORDER CONFIRMATION SCREEN) should maybe mention receiving an email about the order instead of saying the order has been confirmed (can send out an email from stripe webhook API if successful)
--Initial load issues with zustand need fixed
--Mobile responsiveness
--Internal code cleanup and reflect on project structure (make changes where best suited)
--Seperate some logic out into hooks
--Calling cart on every screen should use some kind of context wrapper for this
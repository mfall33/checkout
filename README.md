.env files are scattered across .env and next.config.js

WHAT NEEDS DONE

--Calling cart on every screen should use some kind of context wrapper for this
--Payment success screen (ORDER CONFIRMATION SCREEN) should maybe mention receiving an email about the order instead of saying the order has been confirmed (can send out an email from stripe webhook API if successful)
--login/login issue
--Swap any non caching API calls over to AXIOS
--Need to try and bring screens away from "use client" utilize the server more.
--Initial load issues with zustand need fixed
--Mobile responsiveness
--Seperate some logic out into hooks
--Internal code cleanup and reflect on project structure (make changes where best suited)
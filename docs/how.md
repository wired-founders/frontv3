1. Dashboard Layout loads
    a. load cookies  
    b. fetch user from (/auth/validate)         
        i. redirect (/login)
        ii. get user data = res.json()
    d. get &  update userStore Provider


2. userStoreProvider loads 
2.1
    a. get user data from layout
    b. useRef run createUserStore(initialUser) & store data
    c. add the store to context & shared.

2.2 useUserStore
    a. check the zustand store from context                   * const store = useContext(UserStoreContext);
    b. pick the exact data I ask for with the selector        * return useStore(store, selector);


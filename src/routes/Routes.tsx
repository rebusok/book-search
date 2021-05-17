import React from 'react';
import {Redirect, Route, Switch, useHistory } from 'react-router-dom';
import MappedBooks from "../pages/main/MappedBooks";
import BookItemInfo from "../pages/main/BookItemInfo";


export enum RoutingType {
    main="/main",
    moreInfoBook = "/moreInfoBook",
}

const Routes = () => {
    const history = useHistory();
    return (
        <>
            <Switch>
                <Route path={"/"} exact render={() => <Redirect to={RoutingType.main}/>}/>
                <Route  path={RoutingType.main} render={()=> {
                    return (
                        <>
                        <MappedBooks/>
                        <Route  path = {`${RoutingType.main}/works/:bookId`}
                                exact
                                children={({match}) => {
                                    console.log(match)
                                   return (
                                       <BookItemInfo open={Boolean(match) }  onClose={history.goBack}/>
                                   )
                                }} />
                        </>
                    )
                }}/>


                {/*<Route path={RoutingType.error} render={()=> <ErrorContainer/>}/>*/}
                {/*<Redirect from={'*'} to={RoutingType.error}/>*/}
            </Switch>
        </>
    );
};

export default Routes;
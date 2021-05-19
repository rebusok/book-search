import React from 'react';
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import {MappedBooks, BookItemInfo} from "../pages/Books";
import Error404 from "../pages/ErrorPage/Error404";


export enum RoutingType {
    main = "/main",
    error = '/404'
}

const Routes = () => {
    const history = useHistory();
    return (
        <>
            <Switch>
                <Route path={"/"} exact render={() => <Redirect to={RoutingType.main}/>}/>
                <Route path={RoutingType.main} render={() => {
                    return (
                        <>
                            <MappedBooks/>
                            <Route path={`${RoutingType.main}/works/:bookId`}
                                   exact
                                   children={({match}) => {
                                       console.log(match)
                                       return (
                                           <BookItemInfo open={Boolean(match)} onClose={history.goBack}/>
                                       )
                                   }}/>
                        </>
                    )
                }}/>
                <Route path={RoutingType.error} render={() => <Error404/>}/>
                <Redirect from={'*'} to={RoutingType.error}/>
            </Switch>
        </>
    );
};

export default Routes;
import { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const HomePage = lazy(() => import('./../../../Pages/HomePage'));
const AboutPage = lazy(() => import('./../../../Pages/AboutPage'));
const InheritanceCalculatorPage = lazy(
    () => import('./../../../Pages/InheritanceCalculatorPage'),
);
const ResourcesPage = lazy(() => import('./../../../Pages/ResourcesPage'));

export const menuItems = (
    <div>
        <Suspense fallback={<div></div>}>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/about" component={AboutPage} />
                <Route
                    path="/calculator"
                    component={InheritanceCalculatorPage}
                />
                <Route path="/resources" component={ResourcesPage} />
            </Switch>
        </Suspense>
    </div>
);

import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/template/AuthPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';
import * as firebase from "firebase/app";
import "firebase/performance";


const firebaseConfig = {
  apiKey: "AIzaSyBF7ptrdf9eU-2imtyk7nK_004VwgBsZcw",
  authDomain: "neo-genesis-development.firebaseapp.com",
  databaseURL: "https://neo-genesis-development.firebaseio.com",
  projectId: "neo-genesis-development",
  storageBucket: "",
  messagingSenderId: "24627510397",
  appId: "1:24627510397:web:5f1059eb90bbb2c5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Performance Monitoring and get a reference to the service
//const perf = firebase.performance();

const OutletPage = React.lazy(() => import('pages/master_outlet/OutletPage'));
const OutletSchedulePage = React.lazy(() => import('pages/master_outlet/OutletSchedulePage'));
const OutletDataCameraPage = React.lazy(() => import('pages/master_outlet/OutletDataCameraPage'));
const OutletDataApotikPage = React.lazy(() => import('pages/master_outlet/OutletDataApotikPage'));
const OutletBusdevPage = React.lazy(() => import('pages/master_outlet/OutletBusdevPage'));
const OutletAccPajakPage = React.lazy(() => import('pages/master_outlet/OutletAccPajakPage'));
const OutletAccSupplierPage = React.lazy(() => import('pages/master_outlet/OutletAccSupplierPage'));
const OutletFInancePage = React.lazy(() => import('pages/master_outlet/OutletFInancePage'));

const ShiftPage = React.lazy(() => import('pages/team_adf/ShiftPage'));
const JenisAreaPage = React.lazy(() => import('pages/team_adf/JenisAreaPage'));
const GPLPage = React.lazy(() => import('pages/team_adf/GPLPage'));



const StrengthPage = React.lazy(() => import('pages/m_purchasing/StrengthPage'));
const KlasifikasiBPOMPage = React.lazy(() => import('pages/m_purchasing/KlasifikasiBPOMPage'));
const PackagePage = React.lazy(() => import('pages/m_purchasing/PackagingPage')); 
const DosageFormPage = React.lazy(() => import('pages/m_purchasing/DossagePage'));
const EkspedisiPage = React.lazy(() => import('pages/m_purchasing/EkspedisiPage'));
const ProgramDiscountPage = React.lazy(() => import('pages/billing_discount/BillingDiscount.js'));
const DiscountAMPageAdd = React.lazy(() => import('pages/billing_discount/discount_AM_Add'));
const DiscountAMPageView = React.lazy(() => import('pages/billing_discount/discount_AM_View.js'));
const DiscountAMPageMain = React.lazy(() => import('pages/billing_discount/discount_AM_Main.js'));

const CRP2Page = React.lazy(() => import('pages/CRP2/crp2.js'));
const JenisOutletPage = React.lazy(() => import('pages/m_jenis_outlet/JenisOutlet.js'));
const DiscountAMApprovalPage = React.lazy(() => import('pages/billing_discount/discount_AM_approval.js'));


const PurchaseOrderPage = React.lazy(() => import('pages/purchase_order/Purchase_Order_Tab.js'));
const MonitoringBatchPage = React.lazy(() => import('pages/BatchMonitoring.js'));
const UnitPage = React.lazy(() => import('pages/m_purchasing/UnitPage'));
const AlertPage = React.lazy(() => import('pages/template/AlertPage'));
const AuthModalPage = React.lazy(() => import('pages/template/AuthModalPage'));
const BadgePage = React.lazy(() => import('pages/template/BadgePage'));
const ButtonGroupPage = React.lazy(() => import('pages/template/ButtonGroupPage'));
const ButtonPage = React.lazy(() => import('pages/template/ButtonPage'));
const CardPage = React.lazy(() => import('pages/template/CardPage'));
const ChartPage = React.lazy(() => import('pages/template/ChartPage'));
const DashboardPage = React.lazy(() => import('pages/template/DashboardPage'));
const DropdownPage = React.lazy(() => import('pages/template/DropdownPage'));
const FormPage = React.lazy(() => import('pages/template/FormPage'));
const InputGroupPage = React.lazy(() => import('pages/template/InputGroupPage'));
const ModalPage = React.lazy(() => import('pages/template/ModalPage'));
const ProgressPage = React.lazy(() => import('pages/template/ProgressPage'));
const TablePage = React.lazy(() => import('pages/template/TablePage'));
const TypographyPage = React.lazy(() => import('pages/template/TypographyPage'));
const WidgetPage = React.lazy(() => import('pages/template/WidgetPage'));

const LogBookPage = React.lazy(() => import('pages/LogBook.js'))
const ReminderPage = React.lazy(() => import('pages/ReminderPage.js'));
const NewPage = React.lazy(() => import('pages/NewPage.js'));
const EmptyPage = React.lazy(() => import('pages/EmptyPage'));
const UserPage = React.lazy(() => import('pages/UserPage'));

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <LayoutRoute
              exact
              path="/"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />

            <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                <Route exact path="/dashboard" component={DashboardPage} />
                <Route exact path="/dosageform" component={DosageFormPage} />
                <Route exact path="/kemasan" component={PackagePage} />
                <Route exact path="/strength" component={StrengthPage} />

                <Route
                  exact
                  path="/klasifikasi-bpom"
                  component={KlasifikasiBPOMPage}
                />
                <Route exact path="/ekspedisi" component={EkspedisiPage} />
                <Route exact path="/unit" component={UnitPage} />
                <Route exact path="/login-modal" component={AuthModalPage} />
                <Route exact path="/buttons" component={ButtonPage} />
                <Route exact path="/cards" component={CardPage} />
                <Route exact path="/widgets" component={WidgetPage} />
                <Route exact path="/typography" component={TypographyPage} />
                <Route exact path="/alerts" component={AlertPage} />
                <Route exact path="/tables" component={TablePage} />
                <Route exact path="/badges" component={BadgePage} />

                <Route exact path="/shift-outlet" component={ShiftPage} />
                <Route exact path="/jenis-outlet" component={JenisOutletPage} />
                <Route exact path="/group-pemilik-lokasi" component={GPLPage} />
                <Route exact path="/jenis-area" component={JenisAreaPage} />

                <Route exact path="/outlet" component={OutletPage} />
                <Route
                  exact
                  path="/outletschedule"
                  component={OutletSchedulePage}
                />
                <Route
                  exact
                  path="/outletdatacamera"
                  component={OutletDataCameraPage}
                />
                <Route
                  exact
                  path="/outletdataapotik"
                  component={OutletDataApotikPage}
                />
                <Route
                  exact
                  path="/outletbusdev"
                  component={OutletBusdevPage}
                />
                <Route
                  exact
                  path="/outletaccountingpajak"
                  component={OutletAccPajakPage}
                />
                <Route
                  exact
                  path="/outletaccountingsupplier"
                  component={OutletAccSupplierPage}
                />
                <Route
                  exact
                  path="/outletfinance"
                  component={OutletFInancePage}
                />
                <Route
                  exact
                  path="/programdiscount/purchasing"
                  component={ProgramDiscountPage}
                />

                <Route
                  exact
                  path="/programdiscount/am"
                  component={DiscountAMPageMain}
                />
                <Route
                  exact
                  path="/programdiscount/am/add"
                  component={DiscountAMPageAdd}
                />
                <Route
                  exact
                  path="/programdiscount/am/view"
                  component={DiscountAMPageView}
                />

                <Route
                  exact
                  path="/programdiscount/approval"
                  component={DiscountAMApprovalPage}
                />

                <Route
                  exact
                  path="/button-groups"
                  component={ButtonGroupPage}
                />

                <Route exact path="/dropdowns" component={DropdownPage} />
                <Route exact path="/progress" component={ProgressPage} />
                <Route exact path="/modals" component={ModalPage} />
                <Route exact path="/forms" component={FormPage} />
                <Route exact path="/input-groups" component={InputGroupPage} />
                <Route exact path="/charts" component={ChartPage} />

                <Route exact path="/logbook" component={LogBookPage} />
                <Route exact path="/batch" component={MonitoringBatchPage} />
                <Route exact path="/reminder" component={ReminderPage} />
                <Route exact path="/new" component={NewPage} />
                <Route exact path="/empty" component={EmptyPage} />
                <Route exact path="/user" component={UserPage} />
              </React.Suspense>
            </MainLayout>
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);

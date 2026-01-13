// src/App.tsx
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Theme variables */
import './theme/variables.css';

// Importamos nuestras páginas
import Login from './pages/Login';
import Home from './pages/Home'; 
import Register from './pages/Register';
setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/register">
          <Register />
        </Route>
        {/* Ruta al Login */}
        <Route exact path="/login">
          <Login />
        </Route>

        {/* ✅ Ruta al Home (AGREGADA) */}
        <Route exact path="/home">
          <Home />
        </Route>

        {/* Ruta por defecto: Redirige al Login */}
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
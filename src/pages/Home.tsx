import React, { useState, useEffect } from 'react';
import { 
  IonContent, IonPage, IonButton, IonIcon, IonGrid, IonRow, IonCol, 
  IonProgressBar, IonCard, IonCardContent, IonBadge
} from '@ionic/react';
import { 
  logOutOutline, bookOutline, schoolOutline, trophyOutline, 
  starOutline, playCircleOutline, flashOutline, personCircleOutline 
} from 'ionicons/icons';
import { AuthService } from '../services/authService';
import { useHistory } from 'react-router-dom';
import { auth } from '../services/firebaseConfig';
import './Login.css'; 

const Home: React.FC = () => {
  const history = useHistory();
  const [userName, setUserName] = useState('Yachakuj');

  useEffect(() => {
    const user = auth.currentUser;
    if (user?.displayName) {
      setUserName(user.displayName.split(' ')[0]);
    } else if (user?.email) {
      setUserName(user.email.split('@')[0]);
    }
  }, []);

  const handleLogout = async () => {
    await AuthService.logout();
    history.replace('/login');
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        {/* Mismos fondos que el Login para coherencia visual */}
        <div className="wayra-gradient-bg"></div>
        <div className="bg-circle c1"></div>
        <div className="bg-circle c2"></div>

        <div className="home-content" style={{ padding: '20px', paddingTop: '50px' }}>
          
          {/* HEADER DE BIENVENIDA */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ color: 'white' }}>
              <h2 style={{ margin: 0, fontWeight: '800', fontSize: '1.8rem' }}>Alli Puncha,</h2>
              <h2 style={{ margin: 0, fontWeight: '400', fontSize: '1.5rem', opacity: 0.9 }}>{userName}! 🐆</h2>
            </div>
            <IonIcon icon={personCircleOutline} style={{ fontSize: '45px', color: 'white' }} />
          </div>

          {/* TARJETA DE RACHA Y PUNTOS */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <div className="stat-pill">
              <IonIcon icon={flashOutline} color="warning" />
              <span>7 Días</span>
            </div>
            <div className="stat-pill">
              <IonIcon icon={trophyOutline} style={{ color: '#FFD700' }} />
              <span>1250 XP</span>
            </div>
          </div>

          {/* TARJETA DE PROGRESO */}
          <IonCard className="glass-card">
            <IonCardContent>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white', marginBottom: '10px' }}>
                <span style={{ fontWeight: 'bold' }}>Nivel Básico 1</span>
                <span>45%</span>
              </div>
              <IonProgressBar value={0.45} color="light" className="custom-progress" />
              <p style={{ color: 'white', fontSize: '0.8rem', marginTop: '10px', opacity: 0.8 }}>
                ¡Faltan 3 lecciones para el siguiente nivel!
              </p>
            </IonCardContent>
          </IonCard>

          {/* CUADRICULA DE LECCIONES */}
          <h3 style={{ color: 'white', fontWeight: 'bold', margin: '20px 0 15px 5px' }}>Tu Aprendizaje</h3>
          <IonGrid className="ion-no-padding">
            <IonRow>
              <CategoryItem icon={bookOutline} label="Vocabulario" sub="12 temas" color="#4ECDC4" />
              <CategoryItem icon={schoolOutline} label="Gramática" sub="8 temas" color="#FF6B6B" />
              <CategoryItem icon={playCircleOutline} label="Pronunciación" sub="Videos" color="#A29BFE" />
              <CategoryItem icon={starOutline} label="Retos" sub="Premios" color="#FFD166" />
            </IonRow>
          </IonGrid>

          {/* BOTÓN CERRAR SESIÓN ESTILIZADO */}
          <div style={{ marginTop: '40px', paddingBottom: '30px' }}>
            <IonButton 
              expand="block" 
              className="btn-logout"
              onClick={handleLogout}
            >
              <IonIcon icon={logOutOutline} slot="start" />
              SALIR DE LA MANADA
            </IonButton>
            <p style={{ textAlign: 'center', color: 'white', fontSize: '0.7rem', opacity: 0.5, marginTop: '15px' }}>
              Wayra Kichwa v1.0.0
            </p>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

// Sub-componente para las tarjetas de categorías
const CategoryItem: React.FC<{icon: string, label: string, sub: string, color: string}> = ({icon, label, sub, color}) => (
  <IonCol size="6" style={{ padding: '8px' }}>
    <div className="category-card">
      <div className="icon-circle" style={{ backgroundColor: color }}>
        <IonIcon icon={icon} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontWeight: 'bold', color: '#333', fontSize: '0.9rem' }}>{label}</div>
        <div style={{ color: '#999', fontSize: '0.7rem' }}>{sub}</div>
      </div>
    </div>
  </IonCol>
);

export default Home;
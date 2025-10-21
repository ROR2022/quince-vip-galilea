"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { quinceMainData } from "@/components/sections/data/main-data";

// Componente interno que usa useSearchParams
function EnvelopeContent({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [inviteData, setInviteData] = useState(null); // Datos de la invitación
  const [customHeight, setCustomHeight] = useState('35vh');
  
  const searchParams = useSearchParams();
  const { event } = quinceMainData;

  // Recuperar el query parameter "guest" al montar el componente
  useEffect(() => {
    const guestParam = searchParams.get('guest');
    if (guestParam) {
      getDataGuest(guestParam);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!inviteData) {
      //setGuestName("Familia Hernández Jimenez"); // Fallback si no se proporciona nombre
      console.log("No guest name provided, using fallback.");
    }else{
      console.log("Guest name found:", inviteData.name);
      setCustomHeight('30vh');
    }
  }, [inviteData]);

  useEffect(() => {
  }, [customHeight]);

  const getDataGuest= async (id) => {
    // Aquí podrías hacer una llamada a una API o buscar en un objeto local
    try {
      const response = await fetch(`/api/guests/${id}`);
      if (response.ok) {
        const data = await response.json();
        //console.log("Guest data:", data);
        if (data) {
          const dataGuest= data.data;
          const { personalInvitation } = dataGuest;
          setInviteData({
            name: dataGuest.name,
            message: personalInvitation.message
          });
        }
      } else {
        console.error("Guest not found");
      }
    } catch (error) {
      console.error("Error fetching guest data:", error);
    }
  };


  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpened(true);
      setTimeout(() => {
        onOpen();
      }, 800);
    }, 1000);
  };

  /**
   *
   * 
   * 
   * 
   */

  return (
    <div
    style={{
      backgroundImage: "url('/images/sobreRosa2.png')",
      height:'100vh',
      width:'100vw',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      cursor: 'pointer',
    }}
    onClick={handleOpen}
    >
      <div className="flex flex-col items-center text-rose-700 font-main-text text-lg pt-4">
          <h5>{inviteData? "Invitación Para: " : ""}</h5>
          <div className="mt-2 text-2xl font-semibold">{inviteData ? inviteData.name : ""}</div>
          <div className="mt-2 text-lg">{event.date.full}</div>
          <div className="mt-1 text-sm italic px-8 text-center">
            {inviteData ? inviteData.message : ""}
          </div>
        </div>
        <div
        className={`flex justify-center items-center w-full h-[${customHeight}] cursor-pointer text-pink-800 font-main-text text-5xl font-bold`}
        >
          GALILEA
        </div>
    </div>
  );
}

// Componente de loading/fallback
function EnvelopeLoading() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-stone-100 to-amber-50 flex flex-col items-center justify-center z-[60]">
      <div className="flex flex-col items-center mb-16 text-amber-800 font-main-text text-lg">
        <h5>Invitación Para:</h5>
        <div className="mt-2 text-2xl font-semibold animate-pulse bg-amber-200 h-8 w-64 rounded"></div>
        <div className="mt-2 text-lg">Cargando...</div>
        <div className="mt-1 text-sm italic px-8 text-center">
          Preparando tu invitación personalizada...
        </div>
      </div>
      
      {/* Envelope placeholder */}
      <div className="relative">
        <div className="relative animate-pulse" style={{ width: "450px", height: "300px" }}>
          <div className="absolute inset-0 bg-amber-100 rounded-lg"></div>
        </div>
      </div>
      
      {/* Ambient light effects */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-amber-200/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-200/5 rounded-full blur-3xl" />
    </div>
  );
}

// Componente principal exportado con Suspense
export default function EnvelopeOpening({ onOpen = () => {} }) {
  return (
    <Suspense fallback={<EnvelopeLoading />}>
      <EnvelopeContent onOpen={onOpen} />
    </Suspense>
  );
}

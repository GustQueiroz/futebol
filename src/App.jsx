import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [clubData, setClubData] = useState([]);
  const [selectedClub, setSelectedClub] = useState("");
  const [selectedClubId, setSelectedClubId] = useState("");
  const apiUrl = "https://transfermarkt-api.vercel.app/clubs/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + selectedClubId + "/players", {
          headers: {
            accept: "application/json",
          },
        });
        setClubData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erro na chamada à API do Transfermarkt:", error);
      }
    };

    if (selectedClubId) {
      fetchData();
    }
  }, [selectedClubId]);

  const clubOptions = [
    { id: "221", name: "Santos" },
    { id: "199", name: "Corinthians" },
    { id: "11", name: "Palmeiras" },
  ];

  return (
    <>
      <select
        value={selectedClub}
        onChange={(e) => {
          const selectedOption = clubOptions.find(
            (club) => club.name === e.target.value
          );
          setSelectedClub(selectedOption.name);
          setSelectedClubId(selectedOption.id);
        }}
      >
        <option value="" disabled>
          Selecione um clube
        </option>
        {clubOptions.map((club) => (
          <option key={club.id} value={club.name}>
            {club.name}
          </option>
        ))}
      </select>

      <div>
        {clubData.map((player) => (
          <div key={player.id}>
            <h2>{player.name}</h2>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

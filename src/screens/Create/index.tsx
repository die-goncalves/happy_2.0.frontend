import React, { ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import { useForm } from "react-hook-form";
import mapMarker from "../../images/map-marker.svg";

import "./styles.css";
import "leaflet/dist/leaflet.css";

const mapIcon = L.icon({
  iconUrl: mapMarker,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60],
});
interface UserData {
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  pictures: File[];
}

interface latitudelongitude {
  latitude: number;
  longitude: number;
}

function Createpage() {
  const { goBack } = useHistory();
  const [latlng, setLatLng] = useState<latitudelongitude | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    errors,
  } = useForm<UserData>();

  const onSubmit = (data: UserData) => {
    console.log(data);
    // const multipartForm = new FormData();
    // multipartForm.append("name", data.name);
    // multipartForm.append("about", data.about);
    // multipartForm.append("latitude", String(data.latitude));
    // multipartForm.append("longitude", String(data.longitude));
    // multipartForm.append("instructions", data.instructions);
    // multipartForm.append("opening_hours", data.opening_hours);
    // multipartForm.append("open_on_weekends", String(data.open_on_weekends));
    // data.pictures.forEach((image) => {
    //   multipartForm.append("pictures", image);
    // });
    // // await api.post("/hosting/create", multipartForm);
    // alert("Cadastro realizado com sucesso!");
  };

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }
    const selectedImages = Array.from(event.target.files);

    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image);
    });
    setPreviewImages(selectedImagesPreview);
  }

  function MyMarker() {
    const map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setLatLng({ latitude: lat, longitude: lng });
        setValue("latitude", lat);
        setValue("longitude", lng);
      },
    });

    return latlng ? (
      <Marker icon={mapIcon} position={[latlng.latitude, latlng.longitude]} />
    ) : null;
  }

  // console.log(watch("pictures"));
  return (
    <section id="content-container">
      <aside className="app-sidebar">
        <img src={mapMarker} alt="Happy" />

        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft className="createpage-arrow" size={"3vw"} />
          </button>
        </footer>
      </aside>

      <div className="div-form">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <legend>Dados</legend>
            <div className="map-do">
              <MapContainer
                id={"mapa-dados"}
                center={[8.3693515, -6.8544287]}
                zoom={3.45}
                className={"map"}
                attributionControl={false}
              >
                <TileLayer
                  url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <MyMarker />
              </MapContainer>
              <label
                className={`${
                  !latlng && errors.latitude ? "do invalid" : "do valid"
                }`}
              >
                <span>Clique no mapa para adicionar a localização</span>
              </label>
              <div className="error">
                {!latlng && errors.latitude ? (
                  <p className="error-message">{errors.latitude.message}</p>
                ) : null}
              </div>

              <input
                className="coordenada"
                name="latitude"
                autoComplete="off"
                ref={register({
                  required:
                    "Procure onde está o orfanato e clique para marcar sua localização",
                })}
              />
              <input
                className="coordenada"
                name="longitude"
                autoComplete="off"
                ref={register({
                  required:
                    "Procure onde está o orfanato e clique para marcar sua localização",
                })}
              />
            </div>
            <div className="input-data">
              <label>Nome</label>
              <input
                className={`${
                  errors.name ? "main-name invalid" : "main-name valid"
                }`}
                name="name"
                placeholder="O nome do orfanato..."
                autoComplete="off"
                ref={register({
                  required: "Digite o nome do orfanato",
                })}
              />
              <div className="error">
                {errors.name ? (
                  <p className="error-message">{errors.name.message}</p>
                ) : null}
              </div>
            </div>
            <div className="input-data">
              <label>Sobre</label>
              <textarea
                className={`${
                  errors.about ? "main-about invalid" : "main-about valid"
                }`}
                name="about"
                placeholder="Sobre o orfanato..."
                ref={register({
                  required: "Digite uma breve descrição sobre o orfanato",
                })}
              />
              <div className="error">
                {errors.about ? (
                  <p className="error-message">{errors.about.message}</p>
                ) : null}
              </div>
            </div>
            <div className="input-data">
              <label>Fotos</label>

              <div className="image-container">
                {previewImages.map((image) => {
                  return <img key={image} src={image} />;
                })}
              </div>

              <label
                htmlFor="imagem"
                className={`${
                  errors.pictures
                    ? "pictures invalid"
                    : "pictures valid-pictures"
                }`}
              >
                <FiPlus
                  size={24}
                  className={`${
                    errors.pictures ? "invalid-plus" : "valid-plus"
                  }`}
                />
              </label>
              <div className="error">
                {errors.pictures ? (
                  <p className="error-message">
                    {(errors.pictures as any)?.message}
                  </p>
                ) : null}
              </div>
              <input
                ref={register({
                  required: "Tire pelo menos uma foto e a coloque aqui!",
                })}
                multiple
                type="file"
                id="imagem"
                name="pictures"
                onChange={handleSelectImages}
              />
            </div>
          </fieldset>
          <fieldset>
            <legend>Visitação</legend>
            <div className="input-visitation">
              <label>Instruções</label>
              <textarea
                className={`${
                  errors.instructions
                    ? "main-instructions invalid"
                    : "main-instructions valid"
                }`}
                name="instructions"
                placeholder="O que devemos fazer para visitá-los...."
                ref={register({
                  required: "Insira as instruções para orientar as visitas",
                })}
              />
              <div className="error">
                {errors.instructions ? (
                  <p className="error-message">{errors.instructions.message}</p>
                ) : null}
              </div>
            </div>
            <div className="input-visitation">
              <label>Horário das visitas</label>
              <input
                className={`${
                  errors.opening_hours
                    ? "main-opening_hours invalid"
                    : "main-opening_hours valid"
                }`}
                name="opening_hours"
                autoComplete="off"
                placeholder="09:00-11:00..."
                ref={register({
                  required: "Insira o horário disponível para as visitas",
                })}
              />
              <div className="error">
                {errors.opening_hours ? (
                  <p className="error-message">
                    {errors.opening_hours.message}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="input-visitation">
              <label>Atende fim de semana</label>

              <div className="button-select">
                <input
                  name="open_on_weekends"
                  id="open_on_weekends_true"
                  type="radio"
                  value="true"
                  ref={register({
                    required: "Escolha uma das opções acima.",
                  })}
                />
                <label
                  className={`${
                    errors.open_on_weekends
                      ? "simulate-button-true invalid"
                      : "simulate-button-true valid"
                  }`}
                  htmlFor="open_on_weekends_true"
                >
                  SIM
                </label>
                <input
                  name="open_on_weekends"
                  id="open_on_weekends_false"
                  type="radio"
                  value="false"
                  ref={register({
                    required: "Escolha uma das opções acima.",
                  })}
                />
                <label
                  className={`${
                    errors.open_on_weekends
                      ? "simulate-button-false invalid"
                      : "simulate-button-false valid"
                  }`}
                  htmlFor="open_on_weekends_false"
                >
                  NÃO
                </label>
              </div>
              {errors.open_on_weekends ? (
                <p className="error-message">
                  {errors.open_on_weekends.message}
                </p>
              ) : null}
            </div>
          </fieldset>
          <button className="submit-button" type="submit">
            Confirmar
          </button>
        </form>
      </div>
    </section>
  );
}

export default Createpage;

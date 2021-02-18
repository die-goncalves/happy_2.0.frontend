import React, { ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { FiPlus } from "react-icons/fi";
import { useForm } from "react-hook-form";
import api from "../../services/api";
import SidebarPublic from "../../components/SidebarPublic";
import mapIcon from "../../utils/mapIcon";

import "./styles.css";
import "leaflet/dist/leaflet.css";

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
  const history = useHistory();
  const [latlng, setLatLng] = useState<latitudelongitude | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    errors,
  } = useForm<UserData>();

  const onSubmit = async (data: UserData) => {
    // console.log(data);
    const multipartForm = new FormData();
    multipartForm.append("name", data.name);
    multipartForm.append("about", data.about);
    multipartForm.append("latitude", String(data.latitude));
    multipartForm.append("longitude", String(data.longitude));
    multipartForm.append("instructions", data.instructions);
    multipartForm.append("opening_hours", data.opening_hours);
    multipartForm.append("open_on_weekends", String(data.open_on_weekends));
    for (const image of data.pictures) {
      multipartForm.append("pictures", image);
    }

    await api.post("/hosting/create", multipartForm);
    history.push("/map/create/success");
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
    <div id="create-page">
      <SidebarPublic />

      <div className="create-page-rightside">
        <form className="create-page-form" onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <legend>Dados</legend>
            <div className="create-page-map-do">
              <MapContainer
                center={[8.3693515, -6.8544287]}
                zoom={3.45}
                className={"create-page-map"}
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
                  !latlng && errors.latitude
                    ? "create-page-do invalid"
                    : "create-page-do valid"
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
                className="create-page-coordenada"
                name="latitude"
                autoComplete="off"
                ref={register({
                  required:
                    "Procure onde está o orfanato e clique para marcar sua localização",
                })}
              />
              <input
                className="create-page-coordenada"
                name="longitude"
                autoComplete="off"
                ref={register({
                  required:
                    "Procure onde está o orfanato e clique para marcar sua localização",
                })}
              />
            </div>
            <div className="create-page-input-data">
              <label>Nome</label>
              <input
                className={`${
                  errors.name
                    ? "create-page-name invalid"
                    : "create-page-name valid"
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
            <div className="create-page-input-data">
              <label>Sobre</label>
              <textarea
                className={`${
                  errors.about
                    ? "create-page-about invalid"
                    : "create-page-about valid"
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
            <div className="create-page-input-data">
              <label>Fotos</label>

              <div className="create-page-container">
                {previewImages.map((image) => {
                  return <img key={image} src={image} />;
                })}
              </div>

              <label
                htmlFor="imagem"
                className={`${
                  errors.pictures
                    ? "create-page-pictures invalid"
                    : "create-page-pictures valid-pictures"
                }`}
              >
                <FiPlus
                  className={`${
                    errors.pictures
                      ? "create-page-plus invalid-plus"
                      : "create-page-plus valid-plus"
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
            <div className="create-page-input-data">
              <label>Instruções</label>
              <textarea
                className={`${
                  errors.instructions
                    ? "create-page-instructions invalid"
                    : "create-page-instructions valid"
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
            <div className="create-page-input-data">
              <label>Horário das visitas</label>
              <input
                className={`${
                  errors.opening_hours
                    ? "create-page-opening-hours invalid"
                    : "create-page-opening-hours valid"
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
            <div className="create-page-input-data">
              <label>Atende fim de semana</label>

              <div className="create-page-button-select">
                <input
                  name="open_on_weekends"
                  id="open-on-weekends-true"
                  type="radio"
                  value="true"
                  ref={register({
                    required: "Escolha uma das opções acima.",
                  })}
                />
                <label
                  className={`${
                    errors.open_on_weekends
                      ? "create-page-button-true invalid"
                      : "create-page-button-true valid"
                  }`}
                  htmlFor="open-on-weekends-true"
                >
                  SIM
                </label>
                <input
                  name="open_on_weekends"
                  id="open-on-weekends-false"
                  type="radio"
                  value="false"
                  ref={register({
                    required: "Escolha uma das opções acima.",
                  })}
                />
                <label
                  className={`${
                    errors.open_on_weekends
                      ? "create-page-button-false invalid"
                      : "create-page-button-false valid"
                  }`}
                  htmlFor="open-on-weekends-false"
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
          <button className="create-page-submit-button" type="submit">
            Confirmar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Createpage;

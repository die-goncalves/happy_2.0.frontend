import React, { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import mapIcon from "../../../utils/mapIcon";
import api from "../../../services/api";
import SidebarPublic from "../../../components/SidebarPublic";
import { Orphanage, OrphanageParams } from "../../../interfaces/orphanages";
import { FiPlus } from "react-icons/fi";
import { ImCross } from "react-icons/im";

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
interface PictureData {
  destination: string;
  filename: string;
  _id: any;
}
interface latitudelongitude {
  latitude: number;
  longitude: number;
}

function Editregistered() {
  const history = useHistory();
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [changeMark, setChangeMark] = useState<boolean>(false);
  const [latlng, setLatLng] = useState<latitudelongitude>({
    latitude: 0,
    longitude: 0,
  });
  const [allImages, setAllImages] = useState<PictureData[]>([]);
  const [removeImages, setRemoveImages] = useState<any[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const params = useParams<OrphanageParams>();

  useEffect(() => {
    api.get(`hosting/show?_id=${params._id}`).then((response: any) => {
      setOrphanage(response.data);
      setAllImages(response.data.pictures);
    });
  }, [params._id]);

  const { register, handleSubmit, setValue, errors } = useForm<UserData>();

  const onSubmit: SubmitHandler<UserData> = async (data) => {
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

    for (let id of removeImages) {
      await api.delete(`hosting/picture?delete=${id}`);
    }
    await api.put(`/hosting/update?_id=${params._id}`, multipartForm);
    history.push("/dashboard/registered");
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

  async function removeImage(idImage: any) {
    setRemoveImages((oldArray) => [...oldArray, idImage]);
    setAllImages(allImages.filter((elem) => elem._id !== idImage));
  }

  function MyMarker() {
    const map = useMapEvents({
      click: (e) => {
        setChangeMark(true);
        const { lat, lng } = e.latlng;
        setLatLng({ latitude: lat, longitude: lng });
        setValue("latitude", lat);
        setValue("longitude", lng);
      },
    });
    return null;
  }

  if (!orphanage) {
    return <div>carregando ...</div>;
  }

  return (
    <div id="edit-registered">
      <SidebarPublic path="/dashboard/registered" />

      <div className="edit-registered-rightside">
        <form
          className="edit-registered-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <fieldset>
            <legend>Dados</legend>
            <div className="edit-registered-map-do">
              <MapContainer
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={3.45}
                className={"edit-registered-map"}
                attributionControl={false}
              >
                <TileLayer
                  url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {!changeMark ? (
                  <Marker
                    interactive={false}
                    icon={mapIcon}
                    position={[orphanage.latitude, orphanage.longitude]}
                  />
                ) : (
                  <Marker
                    icon={mapIcon}
                    position={[latlng.latitude, latlng.longitude]}
                  />
                )}
                <MyMarker />
              </MapContainer>
              <label
                className={`${
                  !latlng && errors.latitude
                    ? "edit-registered-do invalid"
                    : "edit-registered-do valid"
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
                className="edit-registered-coordenada"
                name="latitude"
                defaultValue={orphanage.latitude}
                autoComplete="off"
                ref={register({
                  required:
                    "Procure onde está o orfanato e clique para marcar sua localização",
                })}
              />
              <input
                className="edit-registered-coordenada"
                name="longitude"
                defaultValue={orphanage.longitude}
                autoComplete="off"
                ref={register({
                  required:
                    "Procure onde está o orfanato e clique para marcar sua localização",
                })}
              />
            </div>
            <div className="edit-registered-input-data">
              <label>Nome</label>
              <input
                className={`${
                  errors.name
                    ? "edit-registered-name invalid"
                    : "edit-registered-name valid"
                }`}
                name="name"
                defaultValue={orphanage.name}
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
            <div className="edit-registered-input-data">
              <label>Sobre</label>
              <textarea
                className={`${
                  errors.about
                    ? "edit-registered-about invalid"
                    : "edit-registered-about valid"
                }`}
                name="about"
                defaultValue={orphanage.about}
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
            <div className="edit-registered-input-data">
              <label>Fotos</label>

              <div className="edit-registered-container">
                {allImages.map((image) => {
                  return (
                    <div key={image._id} className="edit-registered-grid-imgs">
                      <img
                        className="edit-registered-imgs"
                        src={`http://localhost:3333/uploads/${image.filename}`}
                        alt={orphanage.name}
                      />
                      <div
                        className="edit-registered-cross-imgs"
                        onClick={() => {
                          removeImage(image._id);
                        }}
                      >
                        <ImCross className="edit-registered-cross-icon" />
                      </div>
                    </div>
                  );
                })}
                {previewImages.map((image) => {
                  return (
                    <div key={image} className="edit-registered-grid-imgs">
                      <img className="edit-registered-imgs" src={image} />
                    </div>
                  );
                })}
              </div>

              <label
                htmlFor="imagem"
                className={`${
                  errors.pictures
                    ? "edit-registered-pictures invalid"
                    : "edit-registered-pictures valid-pictures"
                }`}
              >
                <FiPlus
                  className={`${
                    errors.pictures
                      ? "edit-registered-plus invalid-plus"
                      : "edit-registered-plus valid-plus"
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
                ref={register}
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
            <div className="edit-registered-input-data">
              <label>Instruções</label>
              <textarea
                className={`${
                  errors.instructions
                    ? "edit-registered-instructions invalid"
                    : "edit-registered-instructions valid"
                }`}
                name="instructions"
                defaultValue={orphanage.instructions}
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
            <div className="edit-registered-input-data">
              <label>Horário das visitas</label>
              <input
                className={`${
                  errors.opening_hours
                    ? "edit-registered-opening-hours invalid"
                    : "edit-registered-opening-hours valid"
                }`}
                name="opening_hours"
                autoComplete="off"
                defaultValue={orphanage.opening_hours}
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
            <div className="edit-registered-input-data">
              <label>Atende fim de semana</label>

              <div className="edit-registered-button-select">
                <input
                  name="open_on_weekends"
                  id="open-on-weekends-true"
                  type="radio"
                  value="true"
                  defaultChecked={orphanage.open_on_weekends}
                  ref={register({
                    required: "Escolha uma das opções acima.",
                  })}
                />
                <label
                  className={`${
                    errors.open_on_weekends
                      ? "edit-registered-button-true invalid"
                      : "edit-registered-button-true valid"
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
                  defaultChecked={!orphanage.open_on_weekends}
                  ref={register({
                    required: "Escolha uma das opções acima.",
                  })}
                />
                <label
                  className={`${
                    errors.open_on_weekends
                      ? "edit-registered-button-false invalid"
                      : "edit-registered-button-false valid"
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
          <button className="edit-registered-submit-button" type="submit">
            Confirmar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Editregistered;

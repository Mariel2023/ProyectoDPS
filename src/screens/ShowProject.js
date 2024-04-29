import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";

import appFirebase from "../utils/firebase";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  setDoct,
} from "firebase/firestore";
const db = getFirestore(appFirebase);

export const ShowProject = (props) => {
  const [project, setProject] = useState({});

  const getOneProject = async (id) => {
    try {
      const docRef = doc(db, "proyectos", id);
      const docSnap = await getDoc(docRef);
      setProject(docSnap.data());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOneProject(props.route.params.proyectoId);
  }, []);

  const deleteProject = async (id) => {
    await deleteDoc(doc(db, "proyectos", id));
    Alert.alert("Exito", "Proyecto eliminado con exito");
    props.navigation.navigate("List");
  };

  return (
    <View>
      <Text style={styles.titulo}>Detalle del Proyecto</Text>

      <Text style={styles.sub}>Nombre del Proyecto: {project.nombre}</Text>
      <Text style={styles.sub}>Descripción: {project.descripcion}</Text>
      <Text style={styles.sub}>Ubicación: {project.ubicacion}</Text>
      <Text style={styles.sub}>Empleado Encargado: {project.empleado}</Text>
      <Text style={styles.sub}>
        Fecha de Inicio:{" "}
        {project.fechaInicio
          ? project.fechaInicio
          : "No especificada"}
      </Text>
      <Text style={styles.sub}>
        Fecha de Entrega:{" "}
        {project.fechaEntrega
          ? project.fechaEntrega
          : "No especificada"}
      </Text>

      <TouchableOpacity
        style={styles.BotonLista}
        onPress={() => deleteProject(props.route.params.proyectoId)}
      >
        <Text style={styles.TextoNombre}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  titulo: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
  },
  sub: {
    fontSize: 16,
  },

  TextoNombre: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
  },
  BotonLista: {
    backgroundColor: "red",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    marginBottom: 3,
    padding: 5,
    marginTop: 5,
  },
});

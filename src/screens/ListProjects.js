import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Touchable,
  TouchableOpacity,
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

export const ListProjects = (props) => {
  const [lista, setLista] = useState([]);

  // logica para llamara la lista de documentos de la coleccion proteinas
  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "proyectos"));
        const docs = [];
        querySnapshot.forEach((doc) => {
          const { nombre, descripcion, ubicacion, empleado } = doc.data();
          docs.push({
            id: doc.id,
            nombre,
            descripcion,
            ubicacion,
            empleado,
          });
        });
        setLista(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getLista();
  }, [lista]);

  return (
    <ScrollView>
      <TouchableOpacity
        style={styles.Boton}
        onPress={() => props.navigation.navigate("Create")}
      >
        <Text style={styles.TextoBoton}>Agregar Proyecto</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.TextoTitulo}>Lista de Proyectos</Text>
      </View>

      <View>
        {lista.map((list) => (
          <View key={list.id} style={styles.proyectoContainer}>
            <View style={styles.itemContainer}>
              <Text style={styles.TextoNombre}>{list.nombre}</Text>
            </View>
            <View style={styles.botonesContainer}>
              <TouchableOpacity
                style={[styles.Boton, { backgroundColor: "green" }]}
                onPress={() =>
                  props.navigation.navigate("Edit", { proyectoId: list.id })
                }
              >
                <Text style={styles.TextoBoton}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.Boton, { backgroundColor: "red" }]}
                onPress={() =>
                  props.navigation.navigate("Show", { proyectoId: list.id })
                }
              >
                <Text style={styles.TextoBoton}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 15,
  },
  Boton: {
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  TextoBoton: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  TextoTitulo: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  TextoNombre: {
    fontSize: 18,
    flex: 1,
    color: "#333",
  },
  BotonLista: {
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    marginBottom: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  proyectoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  botonesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

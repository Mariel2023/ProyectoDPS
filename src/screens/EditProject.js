import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import appFirebase from "../utils/firebase";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import DatePickerModal from "react-native-modal-datetime-picker";

const db = getFirestore(appFirebase);

export const EditProject = (props) => {
  const [project, setProject] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDateField, setSelectedDateField] = useState("");

  const getProject = async (id) => {
    try {
      const docRef = doc(db, "proyectos", id);
      const docSnap = await getDoc(docRef);
      setProject(docSnap.data());
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const projectId = props.route.params.proyectoId;
    getProject(projectId);
  }, []);

  const showDatePicker = (fieldName) => {
    setSelectedDateField(fieldName);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    const formattedDate = `${padNumber(date.getDate())}/${padNumber(
      date.getMonth() + 1
    )}/${date.getFullYear()}`;
    setProject({ ...project, [selectedDateField]: formattedDate });
    hideDatePicker();
  };

  const padNumber = (number) => {
    return number < 10 ? "0" + number : number;
  };

  const handleChangeText = (value, name) => {
    setProject({ ...project, [name]: value });
  };

  const updateProject = async () => {
    const {
      nombre,
      descripcion,
      ubicacion,
      empleado,
      fechaInicio,
      fechaEntrega,
    } = project;
    const projectId = props.route.params.proyectoId;

    try {
      await updateDoc(doc(db, "proyectos", projectId), {
        nombre,
        descripcion,
        ubicacion,
        empleado,
        fechaInicio,
        fechaEntrega,
      });

      Alert.alert("Éxito", "Proyecto editado con éxito");
      props.navigation.navigate("List");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al editar el proyecto");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <Text>Cargando proyecto...</Text>
      ) : (
        <>
          <Text style={styles.titulo}>Editar Proyecto</Text>

          <View style={styles.inputgroup}>
            <Text style={styles.label}>Nombre del Proyecto:</Text>
            <TextInput
              style={styles.input}
              value={project.nombre}
              onChangeText={(value) => handleChangeText(value, "nombre")}
            />
          </View>

          <View style={styles.inputgroup}>
            <Text style={styles.label}>Descripción del Proyecto:</Text>
            <TextInput
              style={styles.input}
              value={project.descripcion}
              onChangeText={(value) => handleChangeText(value, "descripcion")}
            />
          </View>

          <View style={styles.inputgroup}>
            <Text style={styles.label}>Ubicación:</Text>
            <TextInput
              style={styles.input}
              value={project.ubicacion}
              onChangeText={(value) => handleChangeText(value, "ubicacion")}
            />
          </View>

          <View style={styles.inputgroup}>
            <Text style={styles.label}>Empleado Encargado:</Text>
            <TextInput
              style={styles.input}
              value={project.empleado}
              onChangeText={(value) => handleChangeText(value, "empleado")}
            />
          </View>

          <View style={styles.inputgroup}>
            <Text style={styles.label}>Fecha de Inicio:</Text>
            <TextInput
              style={styles.input}
              value={project.fechaInicio}
              onFocus={() => showDatePicker("fechaInicio")}
            />
          </View>

          <View style={styles.inputgroup}>
            <Text style={styles.label}>Fecha de Entrega:</Text>
            <TextInput
              style={styles.input}
              value={project.fechaEntrega}
              onFocus={() => showDatePicker("fechaEntrega")}
            />
          </View>

          <View>
            <Button title="Guardar Cambios" onPress={updateProject} />
          </View>

          <DatePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
            locale="es"
          />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  titulo: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 12,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 35,
  },
  inputgroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
});

export default EditProject;

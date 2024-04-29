import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import appFirebase from "../utils/firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";
const db = getFirestore(appFirebase);

export const CreateProject = (props) => {
  const initialState = {
    nombre: "",
    descripcion: "",
    ubicacion: "",
    empleado: "",
    fechaInicio: null, // Nuevo campo para la fecha de inicio
    fechaEntrega: null, // Nuevo campo para la fecha de entrega
  };

  const [state, setState] = useState(initialState);
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const showStartDatePicker = () => {
    setStartDatePickerVisible(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisible(false);
  };

  const handleStartDateConfirm = (date) => {
    setState({ ...state, fechaInicio: date });
    hideStartDatePicker();
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisible(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisible(false);
  };

  const handleEndDateConfirm = (date) => {
    setState({ ...state, fechaEntrega: date });
    hideEndDatePicker();
  };

  const SaveProject = async () => {
    try {
      await addDoc(collection(db, "proyectos"), {
        ...state,
        // Convertir a formato ISO solo la fecha sin la hora
        fechaInicio: state.fechaInicio
          ? state.fechaInicio.toLocaleDateString("es-ES")
          : null,
        fechaEntrega: state.fechaEntrega
          ? state.fechaEntrega.toLocaleDateString("es-ES")
          : null,
      });

      Alert.alert("Alerta", "Guardado con éxito");
      props.navigation.navigate("List");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Crear Proyecto</Text>

      <View style={styles.inputgroup}>
        <Text style={styles.label}>Nombre del Proyecto:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre del Proyecto"
          value={state.nombre}
          onChangeText={(value) => handleChangeText(value, "nombre")}
        />
      </View>

      <View style={styles.inputgroup}>
        <Text style={styles.label}>Descripción del Proyecto:</Text>
        <TextInput
          style={styles.input}
          placeholder="Descripción del Proyecto"
          value={state.descripcion}
          onChangeText={(value) => handleChangeText(value, "descripcion")}
        />
      </View>

      <View style={styles.inputgroup}>
        <Text style={styles.label}>Ubicación:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ubicación"
          value={state.ubicacion}
          onChangeText={(value) => handleChangeText(value, "ubicacion")}
        />
      </View>

      <View style={styles.inputgroup}>
        <Text style={styles.label}>Empleado Encargado:</Text>
        <TextInput
          style={styles.input}
          placeholder="Empleado Encargado"
          value={state.empleado}
          onChangeText={(value) => handleChangeText(value, "empleado")}
        />
      </View>

      <View style={styles.inputgroup}>
        <Button
          title="Seleccionar Fecha de Inicio"
          onPress={showStartDatePicker}
        />
        <Text style={styles.dateText}>
          {state.fechaInicio
            ? state.fechaInicio.toLocaleDateString("es-ES")
            : "Fecha de inicio no seleccionada"}
        </Text>
      </View>

      <View style={styles.inputgroup}>
        <Button
          title="Seleccionar Fecha de Entrega"
          onPress={showEndDatePicker}
        />
        <Text style={styles.dateText}>
          {state.fechaEntrega
            ? state.fechaEntrega.toLocaleDateString("es-ES")
            : "Fecha de entrega no seleccionada"}
        </Text>
      </View>

      <View>
        <Button title="Guardar Proyecto" onPress={SaveProject} />
      </View>

      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="date"
        onConfirm={handleStartDateConfirm}
        onCancel={hideStartDatePicker}
        locale="es-ES" // Configuración para mostrar el selector en español
        dateFormat="day month year" // Mostrar solo la fecha sin la hora
      />

      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="date"
        onConfirm={handleEndDateConfirm}
        onCancel={hideEndDatePicker}
        locale="es-ES" // Configuración para mostrar el selector en español
        dateFormat="day month year" // Mostrar solo la fecha sin la hora
      />
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
  dateText: {
    marginTop: 5,
    fontSize: 16,
  },
});

export default CreateProject;

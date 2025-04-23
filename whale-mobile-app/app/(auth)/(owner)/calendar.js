// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { Calendar } from "react-native-calendars";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchFinanceProjection } from "../../../store/slices/financeSlice";
// import { Ionicons } from "@expo/vector-icons";

// export default function CalendarScreen() {
//   const dispatch = useDispatch();
//   const { projection, isLoading } = useSelector((state) => state.finance);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [markedDates, setMarkedDates] = useState({});
//   const [currentMonth, setCurrentMonth] = useState("");

//   // Esse efeito carrega as projeções para o mês atual
//   useEffect(() => {
//     const today = new Date();
//     const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
//     const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

//     const startDate = firstDay.toISOString().split("T")[0];
//     const endDate = lastDay.toISOString().split("T")[0];

//     setCurrentMonth(`${today.getMonth() + 1}/${today.getFullYear()}`);

//     dispatch(fetchFinanceProjection({ startDate, endDate }));
//   }, [dispatch]);

//   // Esse efeito processa os dados da projeção e marca as datas no calendário
//   useEffect(() => {
//     if (!projection || projection.length === 0) return;

//     const newMarkedDates = {};
//     projection.forEach((item) => {
//       const date = item.date.split("T")[0];
//       let color = "#38B26A"; // verde para saldo positivo

//       if (item.balance < 0) {
//         color = "#E74C3C"; // vermelho para saldo negativo
//       } else if (item.balance < 1000) {
//         color = "#F39C12"; // amarelo para saldo baixo
//       }

//       newMarkedDates[date] = {
//         marked: true,
//         dotColor: color,
//         selected: date === selectedDate,
//         selectedColor: date === selectedDate ? "#E0E0E0" : undefined,
//       };
//     });

//     setMarkedDates(newMarkedDates);
//   }, [projection, selectedDate]);

//   const handleDateSelect = (day) => {
//     setSelectedDate(day.dateString);
//   };

//   const handleMonthChange = (month) => {
//     const firstDay = new Date(month.year, month.month - 1, 1);
//     const lastDay = new Date(month.year, month.month, 0);

//     const startDate = firstDay.toISOString().split("T")[0];
//     const endDate = lastDay.toISOString().split("T")[0];

//     setCurrentMonth(`${month.month}/${month.year}`);

//     dispatch(fetchFinanceProjection({ startDate, endDate }));
//   };

//   // Encontrar os dados da projeção para a data selecionada
//   const selectedDayData = selectedDate
//     ? projection.find((item) => item.date.split("T")[0] === selectedDate)
//     : null;

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Calendário Financeiro</Text>
//         <Text style={styles.headerSubtitle}>
//           Visualize suas projeções financeiras
//         </Text>
//       </View>

//       <Calendar
//         onDayPress={handleDateSelect}
//         onMonthChange={handleMonthChange}
//         markedDates={markedDates}
//         markingType={"dot"}
//         theme={{
//           calendarBackground: "#fff",
//           textSectionTitleColor: "#0066CC",
//           selectedDayBackgroundColor: "#0066CC",
//           selectedDayTextColor: "#fff",
//           todayTextColor: "#0066CC",
//           dayTextColor: "#333",
//           dotColor: "#0066CC",
//           selectedDotColor: "#fff",
//           arrowColor: "#0066CC",
//           monthTextColor: "#0066CC",
//           indicatorColor: "#0066CC",
//         }}
//       />

//       <View style={styles.legendContainer}>
//         <View style={styles.legendItem}>
//           <View style={[styles.legendDot, { backgroundColor: "#38B26A" }]} />
//           <Text style={styles.legendText}>Saldo Saudável</Text>
//         </View>
//         <View style={styles.legendItem}>
//           <View style={[styles.legendDot, { backgroundColor: "#F39C12" }]} />
//           <Text style={styles.legendText}>Saldo Baixo</Text>
//         </View>
//         <View style={styles.legendItem}>
//           <View style={[styles.legendDot, { backgroundColor: "#E74C3C" }]} />
//           <Text style={styles.legendText}>Saldo Negativo</Text>
//         </View>
//       </View>

//       {selectedDayData && (
//         <View style={styles.detailsCard}>
//           <Text style={styles.detailsDate}>
//             {new Date(selectedDate).toLocaleDateString("pt-BR", {
//               weekday: "long",
//               year: "numeric",
//               month: "long",
//               day: "numeric",
//             })}
//           </Text>

//           <View style={styles.detailsRow}>
//             <Text style={styles.detailsLabel}>Saldo Projetado:</Text>
//             <Text
//               style={[
//                 styles.detailsValue,
//                 { color: selectedDayData.balance < 0 ? "#E74C3C" : "#38B26A" },
//               ]}
//             >
//               R$ {selectedDayData.balance.toFixed(2)}
//             </Text>
//           </View>

//           <View style={styles.detailsRow}>
//             <Text style={styles.detailsLabel}>Receitas:</Text>
//             <Text style={styles.detailsValue}>
//               R$ {selectedDayData.revenues.toFixed(2)}
//             </Text>
//           </View>

//           <View style={styles.detailsRow}>
//             <Text style={styles.detailsLabel}>Despesas:</Text>
//             <Text style={styles.detailsValue}>
//               R$ {selectedDayData.expenses.toFixed(2)}
//             </Text>
//           </View>

//           {selectedDayData.balance < 0 && (
//             <View style={styles.warningContainer}>
//               <Ionicons name="alert-circle-outline" size={20} color="#E74C3C" />
//               <Text style={styles.warningText}>
//                 Atenção! Saldo negativo projetado para esta data.
//               </Text>
//             </View>
//           )}
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F5F7FA",
//   },
//   header: {
//     padding: 20,
//     backgroundColor: "#0066CC",
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#FFFFFF",
//   },
//   headerSubtitle: {
//     fontSize: 14,
//     color: "#E0E0E0",
//     marginTop: 5,
//   },
//   legendContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     padding: 15,
//     backgroundColor: "#FFFFFF",
//     marginTop: 10,
//   },
//   legendItem: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   legendDot: {
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     marginRight: 5,
//   },
//   legendText: {
//     fontSize: 12,
//     color: "#666",
//   },
//   detailsCard: {
//     margin: 15,
//     padding: 15,
//     backgroundColor: "#FFFFFF",
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   detailsDate: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 15,
//     color: "#333",
//   },
//   detailsRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   detailsLabel: {
//     fontSize: 14,
//     color: "#666",
//   },
//   detailsValue: {
//     fontSize: 14,
//     fontWeight: "bold",
//   },
//   warningContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#FFEBEE",
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   warningText: {
//     color: "#E74C3C",
//     marginLeft: 5,
//     fontSize: 12,
//   },
// });

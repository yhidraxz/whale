import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { PlainBlackText } from "../../components/PlainBlackText.jsx";

export default function consolePage() {
  const [expenseValue, setExpenseValue] = useState(0);
  const [grossValue, setGrossValue] = useState(0);
  const [totalBalance, setBalance] = useState(0);

  useEffect(() => {
    fetch("http://10.0.0.109:3000/SubNumber", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setGrossValue(data.grossValue);
        setExpenseValue(data.expenseValue);
        setBalance(data.totalBalance);
      });
  }, []);

  return (
    <View className="flex-column">
      <View className="flex-row">
        <View className="flex-1 start items-center mt-5">
          <PlainBlackText className="font-robotoBold" content="Receita Bruta" />
          <PlainBlackText content={grossValue} />
        </View>
        <View className="flex-1 end items-center mt-5">
          <PlainBlackText content="Despesas Totais" />
          <PlainBlackText content={expenseValue} />
        </View>
      </View>
      <View>
        <PlainBlackText content="Lucro Total" />
      </View>
    </View>
  );
}

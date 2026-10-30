import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function Favorites() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.header}>Favorites</ThemedText>
      <ThemedText style={styles.subtitleText}>Your favorite reads in one place</ThemedText>
      <ThemedView style={styles.card}>
        <ThemedText style={styles.bookTitle}>The Alchemist</ThemedText>
        <ThemedText style={styles.authorText}>Paulo Coelho</ThemedText>
        <ThemedText style={styles.description}>A story about following dreams and finding meaning.</ThemedText>
      </ThemedView>
      <ThemedView style={styles.card}>
        <ThemedText style={styles.bookTitle}>Atomic Habits</ThemedText>
        <ThemedText style={styles.authorText}>James Clear</ThemedText>
        <ThemedText style={styles.description}>Practical ideas for building better habits every day.</ThemedText>
      </ThemedView>
      <ThemedView style={styles.tipCard}>
        <ThemedText style={styles.tipTitle}>Reading Tip</ThemedText>
        <ThemedText style={styles.description}>Keep your favorite books here so you can return to them quickly.</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}
const styles=StyleSheet.create({
  container:{flex:1,padding:20},header:{marginTop:30,marginBottom:8},subtitleText:{fontSize:17,marginBottom:30,opacity:0.6},
  card:{padding:20,borderRadius:18,marginBottom:15,borderWidth:1,borderColor:'rgba(150,150,150,0.2)'},
  bookTitle:{fontSize:22,fontWeight:'bold'},authorText:{fontSize:15,marginTop:5,opacity:0.6},description:{fontSize:15,lineHeight:22,marginTop:10,opacity:0.75},
  tipCard:{padding:20,borderRadius:18,marginTop:4,borderWidth:1,borderColor:'rgba(215,45,72,0.35)'},tipTitle:{fontSize:18,fontWeight:'bold'}
});

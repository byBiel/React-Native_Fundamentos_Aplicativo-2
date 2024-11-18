import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Container, Content, Icon } from './styles';
import { useState } from 'react';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import { groupCreate } from '@storage/group/groupCreate';
import { AppError } from '@utils/AppError';
import { Alert } from 'react-native';
import { Alarm } from 'phosphor-react-native';

export function NewGroup() {

  const [group, setGroup] = useState('');

  const navigation = useNavigation();

  async function handlePlayer() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('Novo Grupo', 'Infome o nome da turma.')
      }
      await groupCreate(group);
      navigation.navigate('players', { group });
    } catch (error) {
      if(error instanceof AppError){
        Alert.alert('Novo grupo', error.message)
      }else{
        Alert.alert('Novo grupo', "Não foi possivel criar um novo grupo.")
        console.log(error);
      }
      
    }

  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />


        <Highlight
          title='Nova turma'
          subtitle='crie uma nova turma para adicionar pessoas'
        />
        <Input
          placeholder='Nome da turma'
          onChangeText={setGroup}
        />
        <Button
          title='Criar'
          style={{ marginTop: 20 }}
          onPress={handlePlayer}
        />
      </Content>
    </Container>
  );
}

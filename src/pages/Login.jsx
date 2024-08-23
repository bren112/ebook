import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseclient'; 

import './cadastrar.css'; 

function Login() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
  
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('id, nome, telefone, email, senha, avatar');

      if (error) {
        console.error('Error fetching users:', error);
      } else {
        setUsers(data);
      }
    };

    fetchUsers();
  }, []); 

  return (
    <div>
      <h1>Login</h1>
      <table>
        <thead>
          <tr>
        
            <th>Nome</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Senha</th>
            <th>Avatar</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
             
              <td>{user.nome}</td>
              <td>{user.telefone}</td>
              <td>{user.email}</td>
              <td>{user.senha}</td>
              <td>
                {user.avatar ? (
                  <img src={user.avatar} alt="Avatar" width="50" height="50" />
                ) : (
                  'No avatar'
                )}
              </td>
            </tr>
          ))}
        </tbody> 
  </table>
    </div>
  );
}

export default Login;

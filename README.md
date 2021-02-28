<h1 align="center">
    <img alt="NextLevelWeek#03" title="NextLevelWeek#03" src="/assets/logo.svg" width="300px" />
</h1>

<!-- TABLE OF CONTENTS -->
<h5 align="center"> 
<a href="#sobre">Sobre</a>
&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;<a href="#tecnologias">Tecnologias</a> 
&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;<a href="#roadmap">Roadmap</a> 
&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;<a href="#instalação">Instalação</a> 
&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;<a href="#visão-do-projeto">Visão do projeto</a>
&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;<a href="#agradecimento">Agradecimento</a> 
&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;<a href="#licença">Licença</a> 	
&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;<a href="#autor">Autor</a> 
</h5>

## Sobre

<h4>Projeto criado em homenagem ao dia das crianças, que visa conectar pessoas aos orfanatos para fazer o dia de muitas crianças mais feliz.</h4>

Neste repositório você encontrará a versão 2.0 do app Happy que é uma evolução do projeto padrão desenvolvido dentro da semana Next Level Week #03 oferecido pela Rocketseat. No link abaixo você encontrará o projeto original:<br/>
https://github.com/rocketseat-education/nlw-03-omnistack

## Tecnologias

- [Typescript](https://www.typescriptlang.org/)
- [ReactJS](https://reactjs.org/)
- [Nodemailer](https://nodemailer.com/about/)
- [Mailtrap](https://mailtrap.io/)
- [React Router Dom](https://reactrouter.com/web/guides/quick-start)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Leaflet](https://leafletjs.com/)
- [React Leaflet](https://react-leaflet.js.org/)
- [React Hook Form](https://react-hook-form.com/)

## Roadmap

- [x] Criar página inicial
- [x] Criar página para mostrar no mapa os orfanatos aprovados pelo administrador
- [x] Criar página para cadastrar orfanatos
- [x] Criar página de Login
- - [x] Autenticação de usuários
- - [x] Opção "Lembrar-me", salvar token JWT no LocalStorage do navegador
- [x] Criar página para redefinir senhas
- - [x] Redefinição de senhas utilizando Nodemailer e Mailtrap
- [x] Criar página restrita para mostrar orfanatos pendentes - que foram cadastrados, mas ainda não foram aprovados pelo administrador
- - [x] Criar página restrita para aceitar/recusar orfanato pendente
- [x] Criar página restrita para mostrar orfanatos aprovados pelo administrador
- - [x] Criar página restrita para excluir orfanatos aprovados
- - [x] Criar página restrita para editar orfanatos aprovados
- [x] Cadastros de orfanatos devem esperar aprovação de algum administrador para serem mostrados a todos
- [x] Localização real do usuário
- [x] Adicionar Logout nas páginas restritas de orfanatos pendentes e aprovados
- [x] Adicionar Skeleton Screen e efeito shimmer nas páginas que necessitam esperar resposta da API

## Instalação

- ### **Pré-requisitos**

  - É **necessário** possuir o **[Node.js](https://nodejs.org/en/)** instalado no computador.
  - É **necessário** possuir o **[Git](https://git-scm.com/)** instalado e configurado no computador.
  - É **necessário** ter um gerenciador de pacotes seja o **[NPM](https://www.npmjs.com/)** ou **[Yarn](https://yarnpkg.com/)**.
  - É **necessário** ter a versão backend do app **[happy_2.0.backend](https://github.com/die-goncalves/happy_2.0.backend.git)**.
  - É **necessário** que os projetos backend e frontend fiquem em um mesmo diretório.

- ### **Próximo passo**

1. Faça um clone deste repositório:

```sh
  $ git clone https://github.com/die-goncalves/happy_2.0.frontend.git
```

2. Executando a Aplicação:

```sh
  $ cd happy_2.0.frontend

  # Instalar as dependências do projeto.
  $ yarn #ou $ npm install

  # Iniciar a aplicação web
  $ yarn start #ou $ npm start

  # O servidor inciará na porta:3000 - acesse <http://localhost:3000>
```

## Visão do projeto

- Cadastro de 3 orfanatos: <img src="/assets/cadastro.gif" alt="Cadastro" width="100%" height="80%">
- Gerenciar orfanatos pendentes: <img src="/assets/orfanatos-pendentes.gif" alt="Orfanatos-pendentes" width="100%" height="80%">
- Exclusão de orfanato: <img src="/assets/orfanatos-excluir.gif" alt="Orfanatos-excluir" width="100%" height="80%">
- Atualizar orfanato: <img src="/assets/orfanatos-update.gif" alt="Orfanatos-update" width="100%" height="80%">
- Autenticação persistente com JWT: <img src="/assets/orfanatos-jwt.gif" alt="jwt" width="100%" height="80%">
- Redefinir senha: <img src="/assets/orfanatos-redefinir-senha.gif" alt="Redefinir-senha" width="100%" height="80%">

## Agradecimento

<table width="100%" align="center">
	<tr>
		<th>
			<a href="https://rocketseat.com.br/">
				<img width="200" height="180" src="https://avatars.githubusercontent.com/u/28929274?s=200&v=4">
				<br /><sub><b>Rocketseat</b></sub>
			</a>
		</th>
		<th>
			<a href="https://nextlevelweek.com/">
				<img width="200" height="180" src="/assets/logo nlw3.svg">
				<br /><sub><b>Next Level Week #03</b></sub>
			</a>
		</th>
		<th>
			<a href="https://github.com/diego3g">
				<img width="200" height="180" border-radius="10" src="https://avatars.githubusercontent.com/u/2254731?s=400&u=4fcc8ca9672eeb41ea800271831b7c687bc17054&v=4">
				<br /><sub><b>diego3g (Diego Fernandes)</b></sub>
			</a>
		</th>
	</tr>
</table>

## Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Autor

Feito por Diego Gonçalves, contato:

[![Badge](https://img.shields.io/static/v1?label=Linkedin&message=Diego%20Gonçalves&color=208BEE&style=flat-square&logo=linkedin&link=https://www.linkedin.com/in/diego-goncalves1990)](https://www.linkedin.com/in/diego-goncalves1990)
[![Badge](https://img.shields.io/static/v1?label=Gmail&message=die.goncalves1990@gmail.com&color=EA5134&style=flat-square&logo=gmail&link=mailto:die.goncalves1990@gmail.com)](mailto:die.goncalves1990@gmail.com)

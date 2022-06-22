-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mer. 22 juin 2022 à 14:57
-- Version du serveur : 8.0.19-0ubuntu5
-- Version de PHP : 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `cerist`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

CREATE TABLE `admin` (
  `id` int NOT NULL,
  `mail` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`id`, `mail`, `password`) VALUES
(1, 'admin', 'admin');

-- --------------------------------------------------------

--
-- Structure de la table `conserne`
--

CREATE TABLE `conserne` (
  `id` int NOT NULL,
  `formation` int NOT NULL,
  `etudiant` int NOT NULL,
  `etat` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `conserne`
--

INSERT INTO `conserne` (`id`, `formation`, `etudiant`, `etat`) VALUES
(1, 6, 5, 'attend'),
(2, 7, 6, 'attend'),
(3, 9, 7, 'attend'),
(4, 9, 8, 'attend'),
(5, 8, 9, 'archiver');

-- --------------------------------------------------------

--
-- Structure de la table `etudiant`
--

CREATE TABLE `etudiant` (
  `id` int NOT NULL,
  `nom` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `mail` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `fonction` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `organisme` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `groupe` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `etudiant`
--

INSERT INTO `etudiant` (`id`, `nom`, `mail`, `fonction`, `organisme`, `groupe`) VALUES
(5, 'nabil lakrib', 'pni20156789@gmail.com', 'zefef', 'fezef', NULL),
(6, 'nabil lakrib', 'pni20156789@gmail.com', 'zedze', 'ezfze', NULL),
(7, 'nabil', 'pni20156789@gmail.com', 'zdz', 'ezfef', NULL),
(8, 'nabil', 'pni20156789@gmail.com', 'zef', 'zefz', NULL),
(9, 'dezdez ezdzed', '94e5403d13@firemailbox.club', 'ezdze', 'zdadaz', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `formation`
--

CREATE TABLE `formation` (
  `id` int NOT NULL,
  `nom` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `dure` int NOT NULL,
  `dateDebut` date DEFAULT NULL,
  `dateFin` date DEFAULT NULL,
  `admin` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `formation`
--

INSERT INTO `formation` (`id`, `nom`, `type`, `dure`, `dateDebut`, `dateFin`, `admin`) VALUES
(6, 'RI', 'Bureautique', 5, '2022-06-14', '2022-06-22', 1),
(7, 'zefazef', 'Sciences documentaires', 5, '2022-06-22', '2022-06-22', 1),
(8, '11111111111', 'Technologie du web', 55, '2022-06-22', '2022-06-22', 1),
(9, 'ezfzef', 'Systèmes d’information et bases de données', 11, '2022-06-22', '2022-06-22', 1);

-- --------------------------------------------------------

--
-- Structure de la table `fourmateur`
--

CREATE TABLE `fourmateur` (
  `id` int NOT NULL,
  `nom` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `mail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `tel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `groupe`
--

CREATE TABLE `groupe` (
  `id` int NOT NULL,
  `heure` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `formation` int NOT NULL,
  `salle` int NOT NULL,
  `fourmateur` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `journ`
--

CREATE TABLE `journ` (
  `id` int NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `journ`
--

INSERT INTO `journ` (`id`, `date`) VALUES
(10, '2022-06-14'),
(11, '2022-06-22');

-- --------------------------------------------------------

--
-- Structure de la table `present`
--

CREATE TABLE `present` (
  `id` int NOT NULL,
  `etudiant` int NOT NULL,
  `jour` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `present`
--

INSERT INTO `present` (`id`, `etudiant`, `jour`) VALUES
(1, 5, 10),
(2, 5, 11);

-- --------------------------------------------------------

--
-- Structure de la table `salle`
--

CREATE TABLE `salle` (
  `id` int NOT NULL,
  `nom` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `max` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `conserne`
--
ALTER TABLE `conserne`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Id-formation` (`formation`),
  ADD KEY `Id-etudiant` (`etudiant`);

--
-- Index pour la table `etudiant`
--
ALTER TABLE `etudiant`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Id-groupe` (`groupe`);

--
-- Index pour la table `formation`
--
ALTER TABLE `formation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Id-admin` (`admin`);

--
-- Index pour la table `fourmateur`
--
ALTER TABLE `fourmateur`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `groupe`
--
ALTER TABLE `groupe`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Id-formation` (`formation`),
  ADD KEY `Id-salle` (`salle`),
  ADD KEY `Id-formateur` (`fourmateur`);

--
-- Index pour la table `journ`
--
ALTER TABLE `journ`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `present`
--
ALTER TABLE `present`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id-etudiant` (`etudiant`),
  ADD KEY `id-jour` (`jour`);

--
-- Index pour la table `salle`
--
ALTER TABLE `salle`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `conserne`
--
ALTER TABLE `conserne`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `etudiant`
--
ALTER TABLE `etudiant`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `formation`
--
ALTER TABLE `formation`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `fourmateur`
--
ALTER TABLE `fourmateur`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `groupe`
--
ALTER TABLE `groupe`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `journ`
--
ALTER TABLE `journ`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `present`
--
ALTER TABLE `present`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `salle`
--
ALTER TABLE `salle`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `conserne`
--
ALTER TABLE `conserne`
  ADD CONSTRAINT `conserne_ibfk_1` FOREIGN KEY (`formation`) REFERENCES `formation` (`id`),
  ADD CONSTRAINT `conserne_ibfk_2` FOREIGN KEY (`etudiant`) REFERENCES `etudiant` (`id`);

--
-- Contraintes pour la table `etudiant`
--
ALTER TABLE `etudiant`
  ADD CONSTRAINT `etudiant_ibfk_1` FOREIGN KEY (`groupe`) REFERENCES `groupe` (`id`);

--
-- Contraintes pour la table `formation`
--
ALTER TABLE `formation`
  ADD CONSTRAINT `formation_ibfk_1` FOREIGN KEY (`admin`) REFERENCES `admin` (`id`);

--
-- Contraintes pour la table `groupe`
--
ALTER TABLE `groupe`
  ADD CONSTRAINT `groupe_ibfk_1` FOREIGN KEY (`fourmateur`) REFERENCES `fourmateur` (`id`),
  ADD CONSTRAINT `groupe_ibfk_2` FOREIGN KEY (`salle`) REFERENCES `salle` (`id`),
  ADD CONSTRAINT `groupe_ibfk_3` FOREIGN KEY (`formation`) REFERENCES `formation` (`id`);

--
-- Contraintes pour la table `present`
--
ALTER TABLE `present`
  ADD CONSTRAINT `present_ibfk_1` FOREIGN KEY (`jour`) REFERENCES `journ` (`id`),
  ADD CONSTRAINT `present_ibfk_2` FOREIGN KEY (`etudiant`) REFERENCES `etudiant` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

# GymTracker
## Spis treści
- [O projekcie](#o-projekcie)
- [Funkcjonalności](#funkcjonalności)
- [Uruchomienie](#uruchomienie)

## O projekcie
GymTracker to prosta, a zarazem w pełni funkcjonalna aplikacja mobilna na system iOS, umożliwiająca tworzenie spersonalizowanych planów treningowych oraz śledzenie ich realizacji. 
Aplikacja pozwala monitorować progres siłowy w trójboju siłowym (wyciskanie sztangi leżąc, martwy ciąg oraz przysiad), a także kontrolować zmiany w wymiarach ciała.

## Funkcjonalności
- Plany treningowe
  - Tworzenie własnych, spersonalizowanych planów treningowych oraz ich modyfikacja
  - Wyświetlanie zapisanych planów treningowych wraz ze szczegółowym podglądem
- Śledzenie treningu
  - Wyświetlanie listy ćwiczeń zaplanowanych na dany dzień treningowy oraz możliwość zapisu każdej serii w formacie: liczba powtórzeń × użyty ciężar
  - Podgląd całorocznej aktywności treningowej
- Wyniki siłowe oraz pomiary ciała
  - Monitorowanie wyników siłowych za pomocą szczegółowych wykresów oraz porównań postępów
  - Zapisywanie i śledzenie pomiarów ciała

## Uruchomienie
- Uruchomienie backendu
  - Krok 1: Pobrać i otworzyć projekt - po pobraniu kodu z repozytorium, należy uruchomić Visual Studio i wybrać opcję „Otwórz projekt lub rozwiązanie” i wskazać plik Backend.sln znajdujący się w katalogu „Backend”.
  -	Krok 2: Wygenerować strukturę bazy danych
    - Należy otworzyć konsolę: Narzędzia → Menedżer pakietów NuGet → Konsola Menedżera Pakietów.
    - Upewnić się, że w polu „Projekt domyślny” wybrano projekt Api.
    - Wykonać polecenie: Update-Database
  - Krok 3: Uruchomić projekt za pomocą przycisku na pasku narzędzi (zielony trójkąt)
- Uruchomienie frontendu
  - Krok 1: Zweryfikować adres IP - na komputerze należy uruchomić wiersz poleceń i wpisać komendę ipconfig, aby odczytać adres IPv4 (np.192.168.1.17)
  -	Krok 2: W katalogu „Frontend/GymTracker” otworzyć plik .env i zmodyfikować zmienną EXPO_PUBLIC_API_URL, podmieniając adres IPv4
  -	Krok 3: Należy się upewnić, że zapora systemu Windows nie blokuje połączeń przychodzących na wskazanym porcie dla sieci prywatnej
  -	Krok 4: Zainstalować zależności w głównym katalogu aplikacji frontendowej „Frontend/GymTracker” przy użyciu komendy npm install
  -	Krok 5: Uruchomić frontend przy użyciu komendy npx expo start --clear
  -	Krok 6: W terminalu zostanie wygenerowany kod QR, należy zeskanować go przy pomocy aparatu na iPhone i potwierdzić chęć otwarcia projektu w aplikacji Expo Go



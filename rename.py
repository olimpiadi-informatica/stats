import sqlite3
import os
import shutil
import unicodedata
import re

def copy_contestant_images_and_report_uncopied(db_path='data/storage.db', source_dir='static/faces', destination_dir='static/contestants'):
    """
    Copia le immagini dei partecipanti al contest del 2025,
    rinominandole da '{cognome}.jpg' a '{id}.jpg'.
    Stampa solo le immagini presenti in 'static/faces' che non sono state copiate.
    Il cognome viene normalizzato: minuscolo, senza accenti e senza caratteri non alfabetici.

    Args:
        db_path (str): Percorso al file del database SQLite.
        source_dir (str): Directory di origine delle immagini (es. 'static/faces').
        destination_dir (str): Directory di destinazione delle immagini (es. 'static/contestants').
    """

    # Assicurati che la directory di destinazione esista
    os.makedirs(destination_dir, exist_ok=True)
    print(f"✨ Directory di destinazione '{destination_dir}' verificata/creata.")

    # 1. Ottieni tutti i nomi dei file immagine (solo .jpg) attualmente presenti nella directory sorgente
    all_actual_source_files_in_dir = {f for f in os.listdir(source_dir) if f.lower().endswith('.jpg')}
    print(f"🔍 Trovati {len(all_actual_source_files_in_dir)} file .jpg in '{source_dir}'.")

    expected_source_filenames_for_2025 = set()
    copied_count = 0
    skipped_count = 0
    errors_during_copy = []

    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()

        # Seleziona l'ID utente e il cognome dei partecipanti al contest del 2025
        cursor.execute('''
            SELECT
                U.id,
                U.surname
            FROM
                users AS U
            JOIN
                participations AS P
            ON
                U.id = P.user_id
            WHERE
                P.contest_year = 2025;
        ''')

        contestants = cursor.fetchall()
        print(f"🔎 Trovati {len(contestants)} partecipanti per il contest del 2025 nel database.")

        if not contestants:
            print("Nessun partecipante trovato per il contest del 2025. Nessuna immagine da copiare. 😞")
        else:
            for user_id, surname in contestants:
                # Normalizza il cognome: minuscolo, senza accenti, senza spazi, solo caratteri alfabetici
                normalized_surname = unicodedata.normalize('NFKD', surname).encode('ascii', 'ignore').decode('utf-8')
                formatted_surname = re.sub(r'[^a-z]', '', normalized_surname.lower())

                source_filename = f"{formatted_surname}.jpg"
                expected_source_filenames_for_2025.add(source_filename)

                source_image_path = os.path.join(source_dir, source_filename)
                destination_image_path = os.path.join(destination_dir, f"{user_id}.jpg")

                if source_filename in all_actual_source_files_in_dir:
                    try:
                        shutil.copyfile(source_image_path, destination_image_path)
                        copied_count += 1
                    except IOError as e:
                        errors_during_copy.append(f"❌ Errore di I/O durante la copia di '{source_image_path}': {e}")
                        skipped_count += 1
                    except Exception as e:
                        errors_during_copy.append(f"❌ Errore inatteso durante la copia di '{source_image_path}': {e}")
                        skipped_count += 1
                else:
                    # Questo file era atteso ma non esiste nella directory sorgente
                    errors_during_copy.append(f"⚠️ Immagine attesa per '{surname}' (nome file calcolato '{source_filename}') non trovata in '{source_dir}'. Saltato.")
                    skipped_count += 1

            print(f"\n🎉 Processo di copia completato!")
            print(f"➡️ Immagini copiate con successo: {copied_count}")
            if skipped_count > 0:
                print(f"➡️ Immagini saltate o con errori: {skipped_count}")

            for error_msg in errors_during_copy:
                print(error_msg)

    except sqlite3.Error as e:
        print(f"🚫 Errore del database SQLite: {e}")
    except Exception as e:
        print(f"🚫 Si è verificato un errore inaspettato: {e}")
    finally:
        if 'conn' in locals() and conn:
            conn.close()
            print("🗄️ Connessione al database chiusa.")

    # 2. Identifica e stampa le immagini nella directory sorgente che NON sono state copiate
    uncopied_images_in_faces = all_actual_source_files_in_dir - expected_source_filenames_for_2025

    if uncopied_images_in_faces:
        print("\n🖼️ Immagini nella directory 'static/faces' che NON sono state copiate (non corrispondono a partecipanti 2025 o nomi file calcolati):")
        for img_name in sorted(list(uncopied_images_in_faces)):
            print(f"  - {img_name}")
    else:
        print("\nAll le immagini .jpg in 'static/faces' sono state considerate per la copia (o non ce n'erano altre).")

if __name__ == "__main__":
    # Esegui la funzioe
    copy_contestant_images_and_report_uncopied()
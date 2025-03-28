class SchoolID {
  private static generatedSchoolIds: Set<string> = new Set(); // Set to track generated school IDs
  private static characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // A-Z and 0-9
  private static schoolIdLength: number = 3; // School ID length

  // Method to generate a school ID from the school name (first 3 characters)
  public static generateSchoolIdFromName(schoolName: string): string {
    // Step 1: Clean up the school name (remove spaces and convert to uppercase)
    const cleanedName = schoolName.replace(/\s+/g, ''); // Remove all spaces
    let schoolAbbreviation = cleanedName.slice(0, 3).toUpperCase(); // Take the first 3 characters and ensure uppercase

    // Step 2: Ensure the abbreviation is unique
    let uniqueSchoolId = schoolAbbreviation;
    let counter = 1;

    // Step 3: Check if the abbreviation already exists and handle duplicates
    while (this.generatedSchoolIds.has(uniqueSchoolId)) {
        // Only append the counter if the abbreviation is already taken
        // Limit the length of the final ID to 3 characters (counter is used only for disambiguation)
        if (counter > 0) {
            uniqueSchoolId = schoolAbbreviation.slice(0, 3 - counter.toString().length) + counter.toString();
        }
        counter++;
    }

    // Step 4: Add the unique school ID to the set and return it
    this.generatedSchoolIds.add(uniqueSchoolId);
    return uniqueSchoolId;
}




  // Method to generate a random school ID of 3 characters
  public static generateUniqueSchoolId(): string {
    let schoolId = '';

    // Generate a random school ID until it's unique
    do {
      schoolId = '';

      // Step 1: Generate the first character (must be a letter A-Z)
      const firstCharacterIndex = Math.floor(Math.random() * 26); // A-Z => 26 letters
      schoolId += String.fromCharCode(65 + firstCharacterIndex); // 'A' = 65 in ASCII

      // Step 2: Generate the next two characters (can be any character from the full set A-Z, 0-9)
      for (let i = 1; i < this.schoolIdLength; i++) {  // Loop now iterates only for the next two characters
        const randomIndex = Math.floor(Math.random() * this.characters.length);
        schoolId += this.characters[randomIndex];
      }

    } while (this.generatedSchoolIds.has(schoolId)); // Ensure the generated ID is unique

    // Step 3: Store the unique school ID in the Set to prevent future duplicates
    this.generatedSchoolIds.add(schoolId);

    return schoolId;
  }

}
export default SchoolID
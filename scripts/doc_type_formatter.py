import os
import sys
import subprocess
import platform


def format_path(path):
    """
    This function formats the given path into a string that can be used in Sphinx documentation.
    It extracts the filename and directory from the path, and uses them to create a formatted string.
    The directory is used to determine the type of documentation (explanation, tutorial, howto, reference).
    The filename is used as the title of the documentation.
    The function returns a string in the format ":doc:`prefix: title <path>`".

    Parameters:
    path (str): The path of the file to be formatted.

    Returns:
    str: The formatted string.
    """
    dirs, filename = os.path.split(path)
    filename = os.path.splitext(filename)[0]
    title = filename.replace("-", " ").title()
    # get the type of documentation
    dir = dirs.split("/")[1]
    prefix_map = {
        "explanation": "exp",
        "tutorial": "tutorial",
        "howto": "howto",
        "reference": "ref",
    }
    prefix = prefix_map.get(dir, "")
    # delete the .rst prefix
    new_path = path.split("src")[1].split(".rst")[0]
    # Return the formatted string
    return f":doc:`{prefix}: {title} <{new_path}>`"


if __name__ == "__main__":
    """
    This script formats a given path into a string that can be used in Sphinx documentation and copies it to the clipboard.
    It supports MacOS, Linux, and WSL platforms.
    """
    formatted_text = format_path(sys.argv[1])
    print(formatted_text)
    os_platform = platform.system()
    match os_platform:
        case "Darwin":
            subprocess.run("pbcopy", universal_newlines=True, input=formatted_text)
        case "Linux":
            if "Microsoft" in platform.uname().release:
                # This is a WSL platform
                subprocess.run(
                    "clip.exe", universal_newlines=True, input=formatted_text
                )
            else:
                # This is a Linux platform
                try:
                    subprocess.run(
                        "xclip -selection clipboard",
                        universal_newlines=True,
                        input=formatted_text,
                        shell=True,
                    )
                except FileNotFoundError:
                    print("xclip tool is not installed, cannot copy to clipboard.")
        case _:
            print("Unsupported platform.")
